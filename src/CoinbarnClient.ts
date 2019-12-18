import { Address, ErgoBox, Explorer, Transaction } from "@coinbarn/ergo-ts";
import { heightDelta, unitsInOneErgo } from "@coinbarn/ergo-ts/dist/constants";
import Account from "./Account";
import Constants from "./Constants";

export default class CoinbarnClient {
  public explorer: Explorer = new Explorer(Constants.explorerAPI);
  private ergTransferFee: number = Constants.fee;
  private tokenBoxValue: number = 100000;
  private tokenTransferFee: number = this.ergTransferFee - this.tokenBoxValue;

  public async issue(
    acc: Account,
    name: string,
    amount: number,
    decimals: number,
    description: string
  ) {
    if (acc.accountData.boxes === undefined) {
      throw new Error("Balances are not synchronized yet");
    }
    const amountInt = amount * Math.pow(10, decimals);
    const height = await this.explorer.getCurrentHeight();
    const sender: Address = new Address(acc.address);
    const myBoxes = acc.accountData.boxes;
    const basePayloadOuts = [
      new ErgoBox("", this.tokenBoxValue, height - heightDelta, sender)
    ];
    const boxesToSpend = ErgoBox.getSolvingBoxes(
      myBoxes,
      basePayloadOuts,
      this.ergTransferFee
    );
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
        this.tokenBoxValue,
        height - heightDelta,
        sender,
        [token],
        registers
      )
    ];
    // fill this token info to show in unconfirmed transactions
    acc.accountData.tokenInfos[token.tokenId] = payloadOutsWithTokens[0];
    const unsignedTx = Transaction.fromOutputs(
      boxesToSpend,
      payloadOutsWithTokens,
      this.ergTransferFee
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
      factor = await acc.accountData.tokenDecimalsFactor(tokenId);
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
    if (acc.accountData.boxes === undefined) {
      throw new Error("Balances are not synchronized yet");
    }
    const height = await this.explorer.getCurrentHeight();
    const myBoxes = acc.accountData.boxes;
    const payloadOuts = [
      new ErgoBox("", amountInt, height - heightDelta, new Address(recipient))
    ];
    const boxesToSpend = ErgoBox.getSolvingBoxes(
      myBoxes,
      payloadOuts,
      this.ergTransferFee
    );
    const unsignedTx = Transaction.fromOutputs(
      boxesToSpend,
      payloadOuts,
      this.ergTransferFee
    );
    const signedTx = unsignedTx.sign(acc.sk);
    return await this.explorer.broadcastTx(signedTx);
  }

  private async tokenTransfer(
    acc: Account,
    recipient: string,
    tokenId: string,
    amountInt: number
  ) {
    if (acc.accountData.boxes === undefined) {
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
        this.tokenBoxValue,
        height - heightDelta,
        new Address(recipient),
        tokens
      )
    ];
    const myBoxes = acc.accountData.boxes;
    const boxesToSpend = ErgoBox.getSolvingBoxes(
      myBoxes,
      payloadOuts,
      this.tokenTransferFee
    );
    const unsignedTx = Transaction.fromOutputs(
      boxesToSpend,
      payloadOuts,
      this.tokenTransferFee
    );
    const signedTx = unsignedTx.sign(acc.sk);
    return await this.explorer.broadcastTx(signedTx);
  }
}
