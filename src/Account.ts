import {mnemonicToSeedSync} from "bip39";
import {Address, ErgoBox, Explorer, Serializer} from "@coinbarn/ergo-ts";
import {fromSeed} from "bip32";
import {unitsInOneErgo} from "@coinbarn/ergo-ts/dist/constants";
import {ITokens} from "@coinbarn/ergo-ts/dist/models/ITokens";

interface AccountToken extends ITokens {
  tokenInfo: ErgoBox | null
  name: string
  decimals: number
  amountInt: number
}

export default class Account {

  name: string;
  mnemonic: string;
  address: string = '';
  sk: string = '';
  private boxes: ErgoBox[] | undefined = undefined;
  private tokenInfos: any = {};
  private explorer: Explorer = Explorer.mainnet;

  constructor(name: string, mnemonic: string) {
    this.name = name;
    this.mnemonic = mnemonic;
    if (mnemonic !== '') {
      this.sk = Account.seedToSk(mnemonicToSeedSync(mnemonic));
      this.address = Address.fromSk(this.sk).address;
    }
    this.refresh();
  }

  static mnemonicToAddress(mnemonic: string): string {
    const seed = mnemonicToSeedSync(mnemonic);
    const sk = Account.seedToSk(seed);
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

  async refresh() {
    // refresh boxes
    this.boxes = await this.explorer.getUnspentOutputs(new Address(this.address));

    // refresh token infos
    const tokens = ErgoBox.extractAssets(this.boxes);
    tokens.forEach(a => {
      if (this.tokenInfos[a.tokenId] === undefined) {
        this.tokenInfos[a.tokenId] = this.explorer.getTokenInfo(a.tokenId);
      }
    });
    console.log(`refreshed balance ${this.boxes}`);
  }

  balances(): AccountToken[] {
    if (this.boxes === undefined) {
      return [];
    } else {
      const assets = ErgoBox.extractAssets(this.boxes);
      const accountTokens: AccountToken[] = assets.map(a => {
        const box = this.tokenInfos[a.tokenId];
        const decimals = Number(Serializer.stringFromHex(box.additionalRegisters['R6'].slice(4, box.additionalRegisters['R6'].length)));
        const name = Serializer.stringFromHex(box.additionalRegisters['R4'].slice(4, box.additionalRegisters['R4'].length));
        const factor = Math.pow(10, decimals);
        return {
          tokenInfo: box,
          name: name,
          decimals: decimals,
          amountInt: a.amount,
          amount: a.amount / factor,
          tokenId: a.tokenId
        }
      });
      const ergoIntAmount = this.boxes.reduce((sum, {value}) => sum + value, 0);
      const ergToken: AccountToken = {
        tokenInfo: null,
        name: 'ERG',
        decimals: 9,
        amountInt: ergoIntAmount,
        amount: (ergoIntAmount / unitsInOneErgo),
        tokenId: 'ERG'
      };
      accountTokens.push(ergToken);
      return accountTokens
    }
  }

}
