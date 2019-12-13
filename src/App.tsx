import 'css/index.css';
import React from 'react';
import Account from "./Account";
import CoinbarnStorage from "./CoinbarnStorage";
import BarnScreen from "./ui/BarnScreen";
import HomeScreen from "./ui/HomeScreen";
import PasswordScreen from "./ui/PasswordScreen";
import RegistrationScreen from "./ui/RegistrationScreen";
import SeedScreen from "./ui/SeedScreen";
import WelcomeBackScreen from './ui/WelcomeBackScreen';
import WelcomeScreen from './ui/WelcomeScreen';

declare const chrome;
const autoLogoutTime = 10000;

export interface IAppState {
  account: Account
  screen: string
  regPassword: string
  regRecover: boolean
}

export default class App extends React.Component<{}, IAppState> {

  backgroundPort: object;

  constructor(props: {}) {
    super(props);
    const bg = chrome.extension.getBackgroundPage();
    const currState = bg.appState;
    if(!currState) {
      this.state = {
        account: new Account('', ''),
        screen: 'welcome',
        // account: new Account('testa', 'work dynamic rule sister achieve code brisk insect soccer travel medal all'),
        // screen: 'home',
        regPassword: '',
        regRecover: false,
      };
    } else {
      this.state = currState;
    }
    bg.logoutTime = autoLogoutTime;
    bg.clearLogoutTimer();
    this.backgroundPort = chrome.runtime.connect({name: 'bgWatchdog'});
  }

  public updateState = (s: IAppState) => {
    this.setState(s, () => {
      const bg = chrome.extension.getBackgroundPage();
      bg.appState = this.state;
    });
  };

  public render() {
    const registeredAccounts = CoinbarnStorage.getAccountNames();
    let curScreen = <div>Unknown screen {this.state.screen}</div>;
    switch (this.state.screen) {
      case 'welcome':
        if (registeredAccounts.length === 0) {
          curScreen = <WelcomeScreen updateState={this.updateState}/>;
        } else {
          curScreen = <WelcomeBackScreen updateState={this.updateState}
                                         registeredAccounts={registeredAccounts}/>;
        }
        break;
      case 'register':
        curScreen = <RegistrationScreen updateState={this.updateState}
                                        registeredAccounts={registeredAccounts}/>;
        break;
      case 'seed':
        curScreen = <SeedScreen account={this.state.account}
                                regPassword={this.state.regPassword}
                                regRecover={this.state.regRecover}
                                updateState={this.updateState}/>;
        break;
      case 'password':
        curScreen = <PasswordScreen account={this.state.account}
                                    updateState={this.updateState}/>;
        break;
      case 'start':
        curScreen = <BarnScreen updateState={this.updateState}/>;
        break;
      case 'home':
        curScreen = <HomeScreen account={this.state.account}
                                updateState={this.updateState}/>;
        break;
    }

    return curScreen;
  }
}
