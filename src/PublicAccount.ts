import {mnemonicToSeedSync} from "bip39";
import {Address, ErgoBox, Explorer} from "@coinbarn/ergo-ts";
import {fromSeed} from "bip32";
import {unitsInOneErgo} from "@coinbarn/ergo-ts/dist/constants";

export default class PublicAccount {

  name: string;
  boxes: ErgoBox[] | undefined = undefined;
  address: string;
  private explorer: Explorer = Explorer.mainnet;

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
    this.refreshBoxes();
  }

  static fromMnemonic(name: string, mnemonic: string): PublicAccount {
    const address = PublicAccount.mnemonicToAddress(mnemonic);
    return new PublicAccount(name, address);
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

  async refreshBoxes() {
    this.boxes = await this.explorer.getUnspentOutputs(new Address(this.address));
    console.log(`refreshed balance ${this.boxes}`);
  }

  balances() {
    if (this.boxes === undefined) {
      return [];
    } else {
      const assets = ErgoBox.extractAssets(this.boxes);
      const ergBalance = this.boxes.reduce((sum, {value}) => sum + value, 0) / unitsInOneErgo;
      console.log(`Boxes: ${this.boxes.length}`);
      console.log(`ergBalance: ${ergBalance}`);
      assets.push({tokenId: 'ERG', amount: ergBalance});
      return assets
    }
  }

}
