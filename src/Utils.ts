export default class Utils {
  public static fixedFloat(float: number, decimals: number): number {
    return parseFloat(float.toFixed(decimals));
  }
}
