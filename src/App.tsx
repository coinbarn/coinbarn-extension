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

export interface IAppState {
  account: Account
  screen: string
  screenData: string
}

export default class App extends React.Component<{}, IAppState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      // account: new Account('', ''),
      // screen: 'welcome',
      account: new Account('testa', 'work dynamic rule sister achieve code brisk insect soccer travel medal all'),
      screen: 'home',
      screenData: ''
    };
  }

  public updateState = (s: IAppState) => {
    this.setState(s)
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
                                screenData={this.state.screenData}
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
