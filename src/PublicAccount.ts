import {mnemonicToSeedSync} from "bip39";
import {Address} from "@coinbarn/ergo-ts";
import {fromSeed} from "bip32";

export default class PublicAccount {

  name: string;
  private _address: string;

  constructor(name: string, address: string) {
    this.name = name;
    this._address = address;
  }

  static fromMnemonic(name: string, mnemonic: string): PublicAccount {
    const sk = PublicAccount.seedToSk(mnemonic);
    const address = Address.fromSk(sk);
    return new PublicAccount(name, address.address);
  }

  set address(newAd: string) {
    this._address = newAd;
  }

  get address() {
    return this._address;
  }

  static mnemonicToAddress(mnemonic: string): string {
    const seed = mnemonicToSeedSync(mnemonic);
    const sk = PublicAccount.seedToSk(seed);
    return Address.fromSk(sk).address

  }

  static seedToSk(seed, path = "m/44'/429'/0'/0/0") {
    const sk = fromSeed(Buffer.from(seed)).derivePath(path).privateKey;
    if (sk === undefined) {
      throw new Error('Undefined sk');
    } else {
      return sk.toString('hex');
    }
  }


}
