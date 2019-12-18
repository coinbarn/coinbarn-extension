import {
  Address,
  ErgoBox,
  Explorer,
  Input,
  Serializer,
  Transaction
} from "@coinbarn/ergo-ts";

export default class AccountData {
  public confirmedTxs: Transaction[] = [];
  public unconfirmedTxs: Transaction[] = [];
  public boxes?: ErgoBox[];
  public tokenInfos: Record<string, ErgoBox> = {};
  public address: string;
  private explorer: Explorer = Explorer.mainnet;

  constructor(address: string) {
    this.address = address;
  }

  public async refresh() {
    // refresh boxes
    try {
      this.boxes = await this.loadBoxes();
    } catch (e) {
      console.warn(`Failed to refresh unspent outputs: ${e.message}`);
    }

    // refresh transactions
    await this.refreshUnconfirmed();
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

  public tokenDecimalsFactor(tokenId: string) {
    const tokenInfo = this.tokenInfos[tokenId];
    const r6 = "R6";
    const R6: string = tokenInfo.additionalRegisters[r6];
    const decimals = Number(Serializer.stringFromHex(R6.slice(4, R6.length)));
    return Math.pow(10, decimals);
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

  private async refreshUnconfirmed() {
    try {
      this.unconfirmedTxs = await this.explorer.getUnconfirmed(
        new Address(this.address)
      );
    } catch (e) {
      console.warn(`Failed to refresh unconfirmed transactions: ${e.message}`);
    }
  }

  private async loadBoxes(): Promise<ErgoBox[]> {
    const addr = new Address(this.address);
    const allBoxes = await this.explorer.getUnspentOutputs(addr);
    if (!addr.isP2PK()) {
      const height = await this.explorer.getCurrentHeight();
      const maxHeight = height - 720;
      return allBoxes.filter(b => b.creationHeight < maxHeight);
    } else {
      return allBoxes;
    }
  }
}
