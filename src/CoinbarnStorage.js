/*global localStorage*/

import PublicAccount from "./PublicAccount";
import {Address} from "@coinbarn/ergo-ts";
import {fromSeed} from "bip32";
import {mnemonicToSeedSync} from "bip39";

export default class CoinbarnStorage {


  static getAccountNames() {
    let accs = [];
    for (var i = 0; i < localStorage.length; i++) {
      accs[i] = localStorage.key(i);
    }
    return accs;
  }

  static async saveAccount(name, password, mnemonic) {
    const ct = await CoinbarnStorage.encrypt(mnemonic, password);
    localStorage.setItem(name, ct);
  }

  static async getMnemonic(name, password) {
    const item = localStorage.getItem(name);
    return CoinbarnStorage.decrypt(item, password);
  }

  static async getAccount(name, password) {
    return new PublicAccount(name, Address.fromSk(CoinbarnStorage.seedToSk(CoinbarnStorage.getMnemonic(name, password))));
  }

  static async encrypt(plaintext, password) {
    const salt = Buffer.from(await window.crypto.getRandomValues(new Uint8Array(12)));
    const key = await CoinbarnStorage.deriveKey(password, salt);
    const iv =  Buffer.from(await window.crypto.getRandomValues(new Uint8Array(12)));
    const aesGcmParams = {name: 'AES-GCM', iv: iv};
    const encoder = new TextEncoder();
    const dataToEncrypt = encoder.encode(plaintext);
    const cipherText = await window.crypto.subtle.encrypt(aesGcmParams, key, dataToEncrypt);
    return Buffer.concat([Buffer.from(salt), Buffer.from(iv), Buffer.from(cipherText)]);
  }

  static async decrypt(cipherText, password) {
    const salt = Buffer.from(cipherText.slice(0, 12));
    const iv = Buffer.from(cipherText.slice(12, 24));
    const toDecrypt = Buffer.from(cipherText.slice(24));
    const key = await CoinbarnStorage.deriveKey(password, salt);
    const aesGcmParams = {name: 'AES-GCM', iv: iv};
    return await window.crypto.subtle.decrypt(aesGcmParams, key, toDecrypt);
  }

  static async deriveKey(password, salt) {
    const pbkdf2params = {name: 'PBKDF2', hash: 'SHA-256', salt: salt, iterations: 10000};
    const encoder = new TextEncoder('utf-8');
    const baseKey = await window.crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
    const aesKeyGenParams = {name: 'AES-GCM', length: 256};
    return await window.crypto.subtle.deriveKey(pbkdf2params, baseKey, aesKeyGenParams, false, ['encrypt']);
  }

  static seedToSk(seed, path = "m/44'/429'/0'/0/0") {
    return fromSeed(Buffer.from(seed)).derivePath(path).privateKey.toString('hex');
  }

  static mnemonicToAddress(mnemonic) {
    const seed = mnemonicToSeedSync(mnemonic);
    const sk = CoinbarnStorage.seedToSk(seed);
    return Address.fromSk(sk).address
  }


}
