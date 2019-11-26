import React from 'react';
import './normalize.css';
import './style.css';
import WelcomeScreen from './ui/screens/WelcomeScreen';
import SendScreen from './ui/screens/SendScreen';
import SeedScreen from './ui/screens/SeedScreen';
import RegistrationScreen from "./ui/screens/RegistrationScreen";
import CoinbarnStorage from "./CoinbarnStorage";


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // screen: 'welcome'
      screen: 'send'
    };
  }

  render() {
    let curScreen;
    switch (this.state.screen) {
      case 'welcome':
        if (CoinbarnStorage.getAccountNames().length !== 0) {
          curScreen = <WelcomeScreen/>;
        } else {
          curScreen = <RegistrationScreen changeScreen={(screenName) => this.setState({screen: screenName})}/>;
        }
        break;
      case 'seed':
        curScreen = <SeedScreen/>;
        break;
      case 'send':
        curScreen = <SendScreen/>;
        break;
    }

    return (
        <div>
          {curScreen}
        </div>
    );
  }
}
