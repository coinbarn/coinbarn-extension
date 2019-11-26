/*global localStorage*/

export default class CoinbarnStorage {


  static getAccountNames() {
    let accs = [];
    for (var i = 0; i < localStorage.length; i++) {
      accs[i] = localStorage.key(i);
    }
    return accs;
  }

  static async saveAccount(name, password, data, callback) {
    const salt = window.crypto.getRandomValues(new Uint8Array(12));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const key = await this.PBKDF2('SHA-256', salt, password, 2048, 32);
    const aesKey = await crypto.subtle.importKey('raw', key, {name: 'AES-GCM'}, false, ['encrypt']);
    const ct = await this.encrypt(data, aesKey, iv);

    const buff = new Uint8Array(salt.byteLength + iv.byteLength + ct.byteLength);
    buff.set(new Uint8Array(salt), 0);
    buff.set(new Uint8Array(iv), salt.byteLength);
    buff.set(new Uint8Array(ct), salt.byteLength + iv.byteLength);
    const value = this.arrayBufferToBase64(buff);
/*
todo replace with localStorage
    chrome.storage.local.get([name], (val) => {
      if (typeof val[name] !== 'string') val[name] = '';
      val[name] = value;
      chrome.storage.local.set(val);
      callback();
    });
*/
  }

  static async PBKDF2(hash, salt, password, iterations, keyLength) {
    const textEncoder = new TextEncoder('utf-8');
    const passwordBuffer = textEncoder.encode(password);
    const importedKey = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, ['deriveBits']);
    const params = {
      name: 'PBKDF2', hash, salt, iterations,
    };
    return await crypto.subtle.deriveBits(params, importedKey, keyLength * 8);
  }


  static async retrieveSeed(name, password, callback, errorFunc) {
    let data;
/*
    todo replace with localStorage

    chrome.storage.local.get([name], async (record) => {
      data = this.base64ToArrayBuffer(record[name]);
      const salt = data.slice(0, 12);
      const iv = data.slice(12, 24);
      const ct = data.slice(24, record.length);
      const decrKey = await CoinbarnStorage.PBKDF2('SHA-256', salt, password, 2048, 32);
      const aesKey = await crypto.subtle.importKey('raw', decrKey, {name: 'AES-GCM'}, false, ['decrypt']);
      let result;
      try {
        result = await CoinbarnStorage.decrypt(ct, aesKey, iv);
        callback(result);
      } catch (error) {
        errorFunc();
      }
    });
*/
  }


  static encrypt(msg, key, iv) {
    return window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        key,
        msg,
    );
  }

  static decrypt(ct, key, iv) {
    return window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        key,
        ct,
    );
  }

  static arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  static base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
