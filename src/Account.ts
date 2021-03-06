import { Address, ErgoBox, Serializer } from "@coinbarn/ergo-ts";
import { unitsInOneErgo } from "@coinbarn/ergo-ts/dist/constants";
import { ITokens } from "@coinbarn/ergo-ts/dist/models/ITokens";
import { fromSeed } from "bip32";
import { mnemonicToSeedSync } from "bip39";
import * as blake from "blakejs";
import * as bs58 from "bs58";
import * as ec from "elliptic";
import AccountData from "./AccountData";
import Constants from "./Constants";
import Utils from "./Utils";

const { curve } = ec.ec("secp256k1");

interface IAccountToken extends ITokens {
  name: string;
  decimals: number;
  amountInt: number;
}

export default class Account {
  public static readonly empty: Account = new Account("", "", false);

  public static decode(name: string, content: string): Account {
    const json = JSON.parse(content);
    return new Account(name, json.mnemonic, json.minerAcc);
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

  public accountData: AccountData = new AccountData("");
  public minerAcc: boolean;
  public name: string;
  public mnemonic: string;
  public address: string = "";
  public sk: string = "";

  constructor(name: string, mnemonic: string, minerAcc: boolean) {
    this.name = name;
    this.mnemonic = mnemonic;
    this.minerAcc = minerAcc;
    if (mnemonic !== "") {
      this.sk = Account.mnemonicToSk(mnemonic, minerAcc);
      this.address = Account.skToAddress(this.sk, minerAcc).address;
      this.accountData = new AccountData(this.address);
      this.accountData.refresh();
    }
  }

  public balances(): IAccountToken[] {
    if (this.accountData.boxes === undefined) {
      return [];
    } else {
      return this.boxesToBalances(this.accountData.boxes);
    }
  }

  public boxesToBalances(
    boxes: ErgoBox[],
    addErgs: boolean = true
  ): IAccountToken[] {
    const assets = ErgoBox.extractAssets(boxes);
    const accountTokens: IAccountToken[] = assets.map(a => {
      try {
        const box = this.accountData.tokenInfos[a.tokenId];
        const r4 = "R4";
        const slicedR4 = box.additionalRegisters[r4].slice(
          4,
          box.additionalRegisters[r4].length
        );
        const name = Serializer.stringFromHex(slicedR4).slice(0, Constants.maxTokenNameLength);
        const r6 = "R6";
        const slicedR6 = box.additionalRegisters[r6].slice(
          4,
          box.additionalRegisters[r6].length
        );
        const decimals = Number(Serializer.stringFromHex(slicedR6));
        const factor = Math.pow(10, decimals);
        return {
          amount: Utils.fixedFloat(a.amount / factor, decimals),
          amountInt: a.amount,
          decimals: decimals,
          name: name,
          tokenId: a.tokenId
        };
      } catch (e) {
        console.warn(`Failed to get token info for ${a.tokenId}: ${e.message}`);
        return {
          amount: a.amount,
          amountInt: a.amount,
          decimals: 0,
          name: 'unknown',
          tokenId: a.tokenId
        };
      }
    });
    if (addErgs) {
      const ergoIntAmount = boxes.reduce((sum, { value }) => sum + value, 0);
      const ergToken: IAccountToken = {
        amount: Utils.fixedFloat(ergoIntAmount / unitsInOneErgo, 9),
        amountInt: ergoIntAmount,
        decimals: 9,
        name: "ERG",
        tokenId: "ERG"
      };
      accountTokens.unshift(ergToken);
    }
    return accountTokens;
  }

  public encode(): string {
    const obj = {
      mnemonic: this.mnemonic,
      minerAcc: this.minerAcc
    };
    return JSON.stringify(obj);
  }
}
