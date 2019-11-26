import React from 'react';
import './normalize.css';
import './style.css';
import WelcomeScreen from './ui/screens/WelcomeScreen';
import SendScreen from './ui/screens/SendScreen';
import RegistrationScreen from "./ui/screens/RegistrationScreen";
import CoinbarnStorage from "./CoinbarnStorage";


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screen: 'welcome'
    };
  }

  render() {
    let curScreen;
    switch (this.state.screen) {
      case 'welcome':
        if (CoinbarnStorage.getAccountNames().length !== 0) {
          curScreen = <WelcomeScreen/>;
        } else {
          curScreen = <RegistrationScreen/>;
        }
        break;
      case 'send':
        curScreen = <SendScreen address='Dx39FuAa6VniKwPvPq7gRJYTyKLXULX14Na1yPTMdHVj' name='V1sionary' />
        break;
    }

    return (
        <div>
          {curScreen}
        </div>
    );
  }
}
