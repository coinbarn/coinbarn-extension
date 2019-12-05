import React from 'react';
import 'css/index.css';
import WelcomeScreen from './ui/WelcomeScreen';
import WelcomeBackScreen from './ui/WelcomeBackScreen';
import RegistrationScreen from "./ui/RegistrationScreen";
import PublicAccount from "./PublicAccount";
import CoinbarnStorage from "./CoinbarnStorage";
import PasswordScreen from "./ui/PasswordScreen";
import SeedScreen from "./ui/SeedScreen";
import BarnScreen from "./ui/BarnScreen";

interface AppProps {
}

export interface AppState {
  account: PublicAccount
  screen: string
  screenData: string
}

export default class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      account: new PublicAccount('', ''),
      screen: 'welcome',
      screenData: ''
    };
  }

  updateState = (s: AppState) => {
    this.setState(s)
  };

  render() {
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

      /*
            case 'send':
              curScreen = <SendScreen address='Dx39FuAa6VniKwPvPq7gRJYTyKLXULX14Na1yPTMdHVj' name='V1sionary'/>;
              break;
      */
    }

    return (
      <div>
        {curScreen}
      </div>
    )
      ;
  }
}
