import Account from "./Account";

declare const TextDecoder;
declare const TextEncoder;
declare const localStorage;
declare const window;

export default class CoinbarnStorage {
  public static getAccountNames(): string[] {
    const accounts: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      accounts[i] = localStorage.key(i);
    }
    return accounts;
  }

  public static renameAccount(oldName: string, newName: string): boolean {
    const currentAccData = localStorage.getItem(oldName);
    if (localStorage.getItem(newName) === null && currentAccData !== null) {
      localStorage.setItem(newName, currentAccData);
      this.deleteAccount(oldName);
      return true;
    } else {
      return false;
    }
  }

  public static deleteAccount(name: string): void {
    console.log(`DELETE account ${name}`);
    localStorage.removeItem(name)
  }

  public static async saveAccount(name, password, mnemonic): Promise<void> {
    const enc = new TextEncoder("utf-8");
    const bytesToEncrypt = enc.encode(mnemonic);
    const ct = await this.encrypt(bytesToEncrypt, password);
    localStorage.setItem(name, this.arrayBufferToBase64(ct));
  }

  public static async getAccount(name, password): Promise<Account> {
    const mnemonic = await CoinbarnStorage.getMnemonic(name, password);
    return new Account(name, mnemonic);
  }

  public static async encrypt(plaintext, password): Promise<Buffer> {
    const salt = Buffer.from(
      await window.crypto.getRandomValues(new Uint8Array(12))
    );
    const key = await CoinbarnStorage.deriveKey(password, salt);
    const iv = Buffer.from(
      await window.crypto.getRandomValues(new Uint8Array(12))
    );
    const aesGcmParams = {name: "AES-GCM", iv: iv};
    const cipherText = await window.crypto.subtle.encrypt(
      aesGcmParams,
      key,
      plaintext
    );
    return Buffer.concat([
      Buffer.from(salt),
      Buffer.from(iv),
      Buffer.from(cipherText)
    ]);
  }

  public static async decrypt(cipherText, password): Promise<string> {
    const salt = Buffer.from(cipherText.slice(0, 12));
    const iv = Buffer.from(cipherText.slice(12, 24));
    const toDecrypt = Buffer.from(cipherText.slice(24));
    const key = await CoinbarnStorage.deriveKey(password, salt);
    const aesGcmParams = {name: "AES-GCM", iv: iv};
    return await window.crypto.subtle.decrypt(aesGcmParams, key, toDecrypt);
  }

  public static async deriveKey(password, salt) {
    const pbkdf2params = {
      hash: "SHA-256",
      iterations: 10000,
      name: "PBKDF2",
      salt: salt
    };
    const encoder = new TextEncoder("utf-8");
    const baseKey = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const aesKeyGenParams = {name: "AES-GCM", length: 256};
    return await window.crypto.subtle.deriveKey(
      pbkdf2params,
      baseKey,
      aesKeyGenParams,
      false,
      ["encrypt", "decrypt"]
    );
  }

  public static arrayBufferToBase64(buffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  public static base64ToArrayBuffer(base64): ArrayBufferLike {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private static async getMnemonic(name, password): Promise<string> {
    const item = localStorage.getItem(name);
    const decryptedBytes = await this.decrypt(
      this.base64ToArrayBuffer(item),
      password
    );
    const dec = new TextDecoder("utf-8");
    return dec.decode(decryptedBytes);
  }
}
