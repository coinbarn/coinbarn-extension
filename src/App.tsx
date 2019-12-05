import React from 'react';
import 'css/index.css';
//import './dropdown.css';
import WelcomeScreen from './ui/WelcomeScreen';
import WelcomeBackScreen from './ui/WelcomeBackScreen';
import BarnScreen from './ui/BarnScreen';
import HomeScreen from './ui/HomeScreen';
//import SendScreen from './ui/screens/SendScreen';
import RegistrationScreen from "./ui/RegistrationScreen";
//import PublicAccount from "./PublicAccount";
import PasswordScreen from "./ui/PasswordScreen";
import SeedScreen from "./ui/SeedScreen";
import PublicAccount from "./PublicAccount";
//import StartScreen from "./ui/screens/StartScreen";

interface AppProps {
}

export interface AppState {
  account: PublicAccount
  screen: string
}

export default class App extends React.Component<AppProps, AppState> {


  constructor(props: AppProps) {
    super(props);
    this.state = {
      account: new PublicAccount('', ''),
      screen: 'welcome'
      // screen: 'send'
    };
  }

  updateState = (s: AppState) => {
    this.setState(s)
  };

  render() {
    let curScreen = <div>Unknown screen {this.state.screen}</div>;
    switch (this.state.screen) {
      case 'welcome':
        curScreen = <WelcomeScreen updateState={this.updateState}/>;
        break;
/*
      case 'register':
        curScreen =
          <RegistrationScreen updateState={this.updateState}/>;
        break;
      case 'password':
        curScreen = <PasswordScreen account={this.state.account}
                                    updateState={this.updateState}/>;
        break;
      case 'start':
        curScreen = <StartScreen updateState={this.updateState}/>;
        break;
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
