import {Address, ErgoBox, Explorer, Serializer, Transaction} from "@coinbarn/ergo-ts";
import {unitsInOneErgo} from "@coinbarn/ergo-ts/dist/constants";
import {ITokens} from "@coinbarn/ergo-ts/dist/models/ITokens";
import {fromSeed} from "bip32";
import {mnemonicToSeedSync} from "bip39";

interface IAccountToken extends ITokens {
  tokenInfo: ErgoBox | null
  name: string
  decimals: number
  amountInt: number
}

export default class Account {

  public static mnemonicToAddress(mnemonic: string): string {
    const seed = mnemonicToSeedSync(mnemonic);
    const sk = Account.seedToSk(seed);
    return Address.fromSk(sk).address
  }

  public static seedToSk(seed, path = "m/44'/429'/0'/0/0") {
    const sk = fromSeed(Buffer.from(seed)).derivePath(path).privateKey;
    if (sk === undefined) {
      throw new Error('Undefined sk');
    } else {
      return sk.toString('hex');
    }
  }

  public name: string;
  public mnemonic: string;
  public address: string = '';
  public sk: string = '';
  public confirmedTxs: Transaction[] = [];
  public unconfirmedTxs: Transaction[] = [];
  private boxes?: ErgoBox[];
  private tokenInfos: Record<string, ErgoBox> = {};
  private explorer: Explorer = Explorer.mainnet;

  constructor(name: string, mnemonic: string) {
    this.name = name;
    this.mnemonic = mnemonic;
    if (mnemonic !== '') {
      this.sk = Account.seedToSk(mnemonicToSeedSync(mnemonic));
      this.address = Address.fromSk(this.sk).address;
      this.refresh();
    }
  }

  public async refresh() {
    // refresh boxes
    this.boxes = await this.explorer.getUnspentOutputs(new Address(this.address));

    // refresh token infos
    const tokens = ErgoBox.extractAssets(this.boxes);
    tokens.forEach(a => {
      if (this.tokenInfos[a.tokenId] === undefined) {
        this.explorer.getTokenInfo(a.tokenId).then(e => {
          this.tokenInfos[a.tokenId] = e;
        });
      }
    });

    // refresh confirmedTxs
    this.unconfirmedTxs = await this.explorer.getUnconfirmed(new Address(this.address));
    this.confirmedTxs = await this.explorer.getTransactions(new Address(this.address));
  }

  public balances(): IAccountToken[] {
    if (this.boxes === undefined) {
      return [];
    } else {
      const assets = ErgoBox.extractAssets(this.boxes);
      const accountTokens: IAccountToken[] = assets.map(a => {
        const box = this.tokenInfos[a.tokenId];
        const r6 = 'R6';
        const r4 = 'R4';
        const decimals = Number(Serializer.stringFromHex(box.additionalRegisters[r6].slice(4, box.additionalRegisters[r6].length)));
        const name = Serializer.stringFromHex(box.additionalRegisters[r4].slice(4, box.additionalRegisters[r4].length));
        const factor = Math.pow(10, decimals);
        return {
          amount: a.amount / factor,
          amountInt: a.amount,
          decimals: decimals,
          name: name,
          tokenId: a.tokenId,
          tokenInfo: box
        }
      });
      const ergoIntAmount = this.boxes.reduce((sum, {value}) => sum + value, 0);
      const ergToken: IAccountToken = {
        amount: (ergoIntAmount / unitsInOneErgo),
        amountInt: ergoIntAmount,
        decimals: 9,
        name: 'ERG',
        tokenId: 'ERG',
        tokenInfo: null
      };
      accountTokens.push(ergToken);
      return accountTokens
    }
  }

}
