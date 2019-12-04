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
//import StartScreen from "./ui/screens/StartScreen";


interface AppProps {

}

export interface AppState {
  //  account: PublicAccount
  screen: string
}

export default class App extends React.Component<AppProps, AppState> {
  /*  constructor(props: AppProps) {
    super(props);
    this.state = {
      account: new PublicAccount('', ''),
      screen: 'welcome'
    };
    }

  updateState = (s: AppState) => {
    this.setState(s)
    };*/

  render() {
    let curScreen = <SeedScreen />;

    return (
      <div>
        {curScreen}
      </div>
    )
      ;
  }
}
