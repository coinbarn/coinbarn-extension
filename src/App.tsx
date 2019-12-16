import 'css/index.css';
import React from 'react';
import Account from "./Account";
import Background from "./Background";
import CoinbarnStorage from "./CoinbarnStorage";
import BarnScreen from "./ui/BarnScreen";
import HomeScreen from "./ui/HomeScreen";
import PasswordScreen from "./ui/PasswordScreen";
import RegistrationScreen from "./ui/RegistrationScreen";
import SeedScreen from "./ui/SeedScreen";
import WelcomeBackScreen from './ui/WelcomeBackScreen';
import WelcomeScreen from './ui/WelcomeScreen';


export interface IAppState {
  account: Account
  screen: string
  regPassword: string
  regRecover: boolean
}

export default class App extends React.Component<{}, IAppState> {

  private bg: Background = new Background();

  constructor(props: {}) {
    super(props);
    const currState = this.bg.getState();
    if (!currState) {
      this.state = {
        account: Account.empty,
        screen: 'welcome',
        // account: new Account('testa', 'work dynamic rule sister achieve code brisk insect soccer travel medal all'),
        // screen: 'home',
        regPassword: '',
        regRecover: false,
      };
    } else {
      this.state = currState;
    }
  }

  public updateState = (s: IAppState) => {
    this.setState(s, () => {
      this.bg.setState(this.state)
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
