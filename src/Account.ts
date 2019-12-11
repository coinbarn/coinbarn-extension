import {
  Address,
  ErgoBox,
  Explorer,
  Serializer,
  Transaction
} from "@coinbarn/ergo-ts";
import {unitsInOneErgo} from "@coinbarn/ergo-ts/dist/constants";
import {ITokens} from "@coinbarn/ergo-ts/dist/models/ITokens";
import {fromSeed} from "bip32";
import {mnemonicToSeedSync} from "bip39";
import Utils from "./Utils";

interface IAccountToken extends ITokens {
  tokenInfo: ErgoBox | null;
  name: string;
  decimals: number;
  amountInt: number;
}

export default class Account {
  public static mnemonicToAddress(mnemonic: string): string {
    return new Account('?', mnemonic).address
  }

  public static seedToSk(seed, path = "m/44'/429'/0'/0/0") {
    const sk = fromSeed(Buffer.from(seed)).derivePath(path).privateKey;
    if (sk === undefined) {
      throw new Error("Undefined sk");
    } else {
      return sk.toString("hex");
    }
  }

  public name: string;
  public mnemonic: string;
  public address: string = "";
  public sk: string = "";
  public confirmedTxs: Transaction[] = [];
  public unconfirmedTxs: Transaction[] = [];
  private boxes?: ErgoBox[];
  private tokenInfos: Record<string, ErgoBox> = {};
  private explorer: Explorer = Explorer.mainnet;

  constructor(name: string, mnemonic: string) {
    this.name = name;
    this.mnemonic = mnemonic;
    if (mnemonic !== "") {
      this.sk = Account.seedToSk(mnemonicToSeedSync(mnemonic));
      this.address = Address.fromSk(this.sk).address;
      this.refresh();
    }
  }

  public async refresh() {
    // refresh boxes
    try {
      this.boxes = await this.explorer.getUnspentOutputs(
        new Address(this.address)
      );
    } catch (e) {
      console.warn(`Failed to refresh unspent outputs`, e)
    }

    try {
      if (this.boxes !== undefined) {
        // refresh token infos
        const tokens = ErgoBox.extractAssets(this.boxes);
        tokens.forEach(a => {
          if (this.tokenInfos[a.tokenId] === undefined) {
            this.explorer.getTokenInfo(a.tokenId).then(e => {
              this.tokenInfos[a.tokenId] = e;
            });
          }
        });
      }
    } catch (e) {
      console.warn(`Failed to get token infos unspent outputs`, e)
    }

    // refresh transactions
    try {
      this.unconfirmedTxs = await this.explorer.getUnconfirmed(
        new Address(this.address)
      );
    } catch (e) {
      console.warn(`Failed to refresh unconfirmed transactions`, e)
    }
    try {
      this.confirmedTxs = await this.explorer.getTransactions(
        new Address(this.address)
      );
    } catch (e) {
      console.warn(`Failed to refresh confirmed transactions`, e)
    }
  }

  public balances(): IAccountToken[] {
    if (this.boxes === undefined) {
      return [];
    } else {
      const assets = ErgoBox.extractAssets(this.boxes);
      const accountTokens: IAccountToken[] = assets.map(a => {
        const box = this.tokenInfos[a.tokenId];
        const r4 = "R4";
        const slicedR4 = box.additionalRegisters[r4].slice(4, box.additionalRegisters[r4].length);
        const name = Serializer.stringFromHex(slicedR4);
        const r6 = "R6";
        const slicedR6 = box.additionalRegisters[r6].slice(4, box.additionalRegisters[r6].length);
        const decimals = Number(Serializer.stringFromHex(slicedR6));
        const factor = Math.pow(10, decimals);
        return {
          amount: Utils.fixedFloat(a.amount / factor, decimals),
          amountInt: a.amount,
          decimals: decimals,
          name: name,
          tokenId: a.tokenId,
          tokenInfo: box
        };
      });
      const ergoIntAmount = this.boxes.reduce(
        (sum, {value}) => sum + value,
        0
      );
      const ergToken: IAccountToken = {
        amount: Utils.fixedFloat(ergoIntAmount / unitsInOneErgo, 9),
        amountInt: ergoIntAmount,
        decimals: 9,
        name: "ERG",
        tokenId: "ERG",
        tokenInfo: null
      };
      accountTokens.unshift(ergToken);
      return accountTokens;
    }
  }
}
