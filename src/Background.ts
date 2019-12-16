import { IAppState } from "./App";
import Constants from "./Constants";

declare const chrome;

export default class Background {
  private backgroundPort;
  private bg;

  constructor() {
    try {
      this.backgroundPort = chrome.runtime.connect({ name: "bgWatchdog" });
      this.bg = chrome.extension.getBackgroundPage();
      this.bg.logoutTime = Constants.autoLogoutTime;
      this.bg.clearLogoutTimer();
    } catch (e) {
      console.warn(`Unable to initialize background: ${e.message}`);
    }
  }

  public getState(): IAppState | null {
    try {
      return this.bg.appState;
    } catch (e) {
      return null;
    }
  }

  public setState(state: IAppState): void {
    try {
      this.bg.appState = state;
    } catch (e) {
      console.warn(`Unable to save state to background`);
    }
  }
}
