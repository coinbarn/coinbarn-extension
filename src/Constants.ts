export default class Constants {
  public static explorerURL: string = "https://explorer.ergoplatform.com";
  public static explorerAPI: string = "https://api.ergoplatform.com";
  public static siteURL: string = "https://coinbarn.app";
  public static termsURL: string =
    "https://github.com/coinbarn/coinbarn-extension/blob/master/USER_AGREEMENT.md";
  // TODO write privacy policy
  public static privacyURL: string =
    "https://github.com/coinbarn/coinbarn-extension/blob/master/PRIVACY.md";
  // Logout time in milliseconds
  public static autoLogoutTime: number = 10000;
  public static minTokenNameLength: number = 2;
  public static maxTokenNameLength: number = 8;
}
