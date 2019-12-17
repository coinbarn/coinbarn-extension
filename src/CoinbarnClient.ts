import {
  Address,
  ErgoBox,
  Explorer,
  feeValue,
  minBoxValue,
  Transaction
} from "@coinbarn/ergo-ts";
import { heightDelta, unitsInOneErgo } from "@coinbarn/ergo-ts/dist/constants";
import Account from "./Account";
import Constants from "./Constants";

export default class CoinbarnClient {
  public explorer: Explorer = new Explorer(Constants.explorerAPI);

  public async issue(
    acc: Account,
    name: string,
    amount: number,
    decimals: number,
    description: string
  ) {
    if (acc.boxes === undefined) {
      throw new Error("Balances are not synchronized yet");
    }
    const amountInt = amount * Math.pow(10, decimals);
    const height = await this.explorer.getCurrentHeight();
    const sender: Address = new Address(acc.address);
    const myBoxes = acc.boxes;
    const basePayloadOuts = [
      new ErgoBox("", feeValue, height - heightDelta, sender)
    ];
    const boxesToSpend = ErgoBox.getSolvingBoxes(myBoxes, basePayloadOuts);
    const token = {
      amount: amountInt,
      tokenId: boxesToSpend[0].id
    };
    // Reminder: serializedByteArrayInRegister = '\x0e' + intToVlq(bytearray.length) + byteArray
    const registers = ErgoBox.encodeRegisters({
      R4: name,
      R5: description,
      R6: decimals
    });
    const payloadOutsWithTokens = [
      new ErgoBox(
        "",
        minBoxValue,
        height - heightDelta,
        sender,
        [token],
        registers
      )
    ];
    const unsignedTx = Transaction.fromOutputs(
      boxesToSpend,
      payloadOutsWithTokens
    );
    const signedTx = unsignedTx.sign(acc.sk);
    return await this.explorer.broadcastTx(signedTx);
  }

  public async transfer(
    acc: Account,
    recipient: string,
    amount: number,
    tokenId: string = "ERG"
  ) {
    let factor = unitsInOneErgo;
    if (tokenId !== "ERG") {
      factor = await acc.tokenDecimalsFactor(tokenId);
    }
    return this.transferInt(acc, recipient, amount * factor, tokenId);
  }

  private async transferInt(
    acc: Account,
    recipient: string,
    amountInt: number,
    tokenId: string = "ERG"
  ) {
    if (tokenId === "ERG") {
      return this.ergTransfer(acc, recipient, amountInt);
    } else {
      return this.tokenTransfer(acc, recipient, tokenId, amountInt);
    }
  }

  private async ergTransfer(
    acc: Account,
    recipient: string,
    amountInt: number
  ) {
    if (acc.boxes === undefined) {
      throw new Error("Balances are not synchronized yet");
    }
    const height = await this.explorer.getCurrentHeight();
    const myBoxes = acc.boxes;
    const payloadOuts = [
      new ErgoBox("", amountInt, height - heightDelta, new Address(recipient))
    ];
    const boxesToSpend = ErgoBox.getSolvingBoxes(myBoxes, payloadOuts);
    const unsignedTx = Transaction.fromOutputs(boxesToSpend, payloadOuts);
    const signedTx = unsignedTx.sign(acc.sk);
    return await this.explorer.broadcastTx(signedTx);
  }

  private async tokenTransfer(
    acc: Account,
    recipient: string,
    tokenId: string,
    amountInt: number
  ) {
    if (acc.boxes === undefined) {
      throw new Error("Balances are not synchronized yet");
    }
    const height = await this.explorer.getCurrentHeight();
    const tokens = [
      {
        amount: amountInt,
        tokenId
      }
    ];
    const payloadOuts = [
      new ErgoBox(
        "",
        minBoxValue,
        height - heightDelta,
        new Address(recipient),
        tokens
      )
    ];
    const myBoxes = acc.boxes;
    const boxesToSpend = ErgoBox.getSolvingBoxes(myBoxes, payloadOuts);
    const unsignedTx = Transaction.fromOutputs(boxesToSpend, payloadOuts);
    const signedTx = unsignedTx.sign(acc.sk);
    return await this.explorer.broadcastTx(signedTx);
  }
}