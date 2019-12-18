import {
  Address,
  ErgoBox,
  Explorer,
  Input,
  Serializer,
  Transaction
} from "@coinbarn/ergo-ts";
import { unitsInOneErgo } from "@coinbarn/ergo-ts/dist/constants";
import { ITokens } from "@coinbarn/ergo-ts/dist/models/ITokens";
import { fromSeed } from "bip32";
import { mnemonicToSeedSync } from "bip39";
import * as blake from "blakejs";
import * as bs58 from "bs58";
import * as ec from "elliptic";
import Constants from "./Constants";
import Utils from "./Utils";

const { curve } = ec.ec("secp256k1");

interface IAccountToken extends ITokens {
  tokenInfo: ErgoBox | null;
  name: string;
  decimals: number;
  amountInt: number;
}

export default class Account {
  public static readonly empty: Account = new Account("", "", false);

  public static decode(content: string): Account {
    const json = JSON.parse(content);
    return new Account(json.name, json.mnemonic, json.minerAcc);
  }

  private static mnemonicToSk(mnemonic: string, minerAcc: boolean): string {
    if (minerAcc) {
      const seed = mnemonicToSeedSync(mnemonic);
      const sk = fromSeed(Buffer.from(seed)).privateKey;
      if (sk === undefined) {
        console.warn("Failed to get miner sk");
        return "";
      } else {
        return sk.toString("hex");
      }
    } else {
      const seed = mnemonicToSeedSync(mnemonic);
      const sk = fromSeed(seed).derivePath(Constants.secretPath).privateKey;
      if (sk === undefined) {
        throw new Error("Undefined sk");
      } else {
        return sk.toString("hex");
      }
    }
  }

  private static skToAddress(sk: string, minerAcc: boolean): Address {
    if (minerAcc) {
      const pk = Buffer.from(curve.g.mul(sk).encodeCompressed()).toString(
        "HEX"
      );
      const prefix = Buffer.from("03100204a00b08cd", "hex");
      const postfix = Buffer.from("ea02d192a39a8cc7a70173007301", "hex");
      const contentBytes = Buffer.from(pk, "hex");

      const content = Buffer.concat([prefix, contentBytes, postfix]);
      const checksum = Buffer.from(
        blake.blake2b(content, null, 32),
        "hex"
      ).slice(0, 4);
      const address = Buffer.concat([content, checksum]);
      return new Address(bs58.encode(address));
    } else {
      return Address.fromSk(sk);
    }
  }

  public minerAcc: boolean;
  public name: string;
  public mnemonic: string;
  public address: string = "";
  public sk: string = "";
  public confirmedTxs: Transaction[] = [];
  public unconfirmedTxs: Transaction[] = [];
  public boxes?: ErgoBox[];
  private tokenInfos: Record<string, ErgoBox> = {};
  private explorer: Explorer = Explorer.mainnet;

  constructor(name: string, mnemonic: string, minerAcc: boolean) {
    this.name = name;
    this.mnemonic = mnemonic;
    this.minerAcc = minerAcc;
    if (mnemonic !== "") {
      this.sk = Account.mnemonicToSk(mnemonic, minerAcc);
      this.address = Account.skToAddress(this.sk, minerAcc).address;
      this.refresh();
    }
  }

  public async refresh() {
    // refresh boxes
    try {
      this.boxes = await this.loadBoxes();
    } catch (e) {
      console.warn(`Failed to refresh unspent outputs: ${e.message}`);
    }

    // refresh transactions
    try {
      this.unconfirmedTxs = await this.explorer.getUnconfirmed(
        new Address(this.address)
      );
    } catch (e) {
      console.warn(`Failed to refresh unconfirmed transactions: ${e.message}`);
    }
    try {
      this.confirmedTxs = await this.explorer.getTransactions(
        new Address(this.address)
      );
    } catch (e) {
      console.warn(`Failed to refresh confirmed transactions: ${e.message}`);
    }

    // token infos
    try {
      const txs = this.confirmedTxs.concat(this.unconfirmedTxs);
      const myBoxes = txs.flatMap(b => b.outputs).filter(b => this.isMine(b));
      // refresh token infos
      const tokens = ErgoBox.extractAssets(myBoxes);
      for (const a of tokens) {
        if (this.tokenInfos[a.tokenId] === undefined) {
          this.tokenInfos[a.tokenId] = await this.explorer.getTokenInfo(
            a.tokenId
          );
        }
      }
    } catch (e) {
      console.warn(`Failed to get token infos: ${e.message}`);
    }
  }

  public balances(): IAccountToken[] {
    if (this.boxes === undefined) {
      return [];
    } else {
      return this.boxesToBalances(this.boxes);
    }
  }

  public boxesToBalances(
    boxes: ErgoBox[],
    addErgs: boolean = true
  ): IAccountToken[] {
    const assets = ErgoBox.extractAssets(boxes);
    const accountTokens: IAccountToken[] = assets.flatMap(a => {
      try {
        const box = this.tokenInfos[a.tokenId];
        const r4 = "R4";
        const slicedR4 = box.additionalRegisters[r4].slice(
          4,
          box.additionalRegisters[r4].length
        );
        const name = Serializer.stringFromHex(slicedR4);
        const r6 = "R6";
        const slicedR6 = box.additionalRegisters[r6].slice(
          4,
          box.additionalRegisters[r6].length
        );
        const decimals = Number(Serializer.stringFromHex(slicedR6));
        const factor = Math.pow(10, decimals);
        return [
          {
            amount: Utils.fixedFloat(a.amount / factor, decimals),
            amountInt: a.amount,
            decimals: decimals,
            name: name,
            tokenId: a.tokenId,
            tokenInfo: box
          }
        ];
      } catch (e) {
        console.warn(`Failed to get token info for ${a.tokenId}: ${e.message}`);
        return [];
      }
    });
    if (addErgs) {
      const ergoIntAmount = boxes.reduce((sum, { value }) => sum + value, 0);
      const ergToken: IAccountToken = {
        amount: Utils.fixedFloat(ergoIntAmount / unitsInOneErgo, 9),
        amountInt: ergoIntAmount,
        decimals: 9,
        name: "ERG",
        tokenId: "ERG",
        tokenInfo: null
      };
      accountTokens.unshift(ergToken);
    }
    return accountTokens;
  }

  public isMine(box: Input | ErgoBox): boolean {
    if (box instanceof ErgoBox) {
      return box.address.address === this.address;
    } else if (this.boxes !== undefined) {
      return (
        box.address === this.address ||
        this.boxes.find(b => b.id === box.boxId) !== undefined
      );
    } else {
      return false;
    }
  }

  public encode(): string {
    const obj = {
      name: this.name,
      mnemonic: this.mnemonic,
      minerAcc: this.minerAcc
    };
    return JSON.stringify(obj);
  }

  // todo extract to separate class
  public tokenDecimalsFactor(tokenId: string) {
    const tokenInfo = this.tokenInfos[tokenId];
    const r6 = "R6";
    const R6: string = tokenInfo.additionalRegisters[r6];
    const decimals = Number(Serializer.stringFromHex(R6.slice(4, R6.length)));
    return Math.pow(10, decimals);
  }

  private async loadBoxes(): Promise<ErgoBox[]> {
    const addr = new Address(this.address);
    const allBoxes = await this.explorer.getUnspentOutputs(addr);
    if (this.minerAcc) {
      const height = await this.explorer.getCurrentHeight();
      const maxHeight = height - 720;
      return allBoxes.filter(b => b.creationHeight < maxHeight);
    } else {
      return allBoxes;
    }
  }
}
