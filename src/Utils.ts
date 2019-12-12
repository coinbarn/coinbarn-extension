declare const console;

export default class Utils {

  static explorerURL:string = "https://explorer.ergoplatform.com";
  static explorerAPI:string = "https://api.ergoplatform.com";

  public static fixedFloat(float: number, decimals: number): number {
    return parseFloat(float.toFixed(decimals));
  }
}
