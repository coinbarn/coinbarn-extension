import React from 'react';
import './normalize.css';
import './style.css';
import './dropdown.css';
import WelcomeScreen from './ui/screens/WelcomeScreen';
import SendScreen from './ui/screens/SendScreen';
import RegistrationScreen from "./ui/screens/RegistrationScreen";
import PublicAccount from "./PublicAccount";
import CoinbarnStorage from "./CoinbarnStorage";


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      account: new PublicAccount('', '', ''),
      screen: 'welcome'
      // screen: 'send'
    };
  }

  render() {

    let curScreen = `Unknown screen ${this.state.screen}`;
    switch (this.state.screen) {
      case 'welcome':
        if (CoinbarnStorage.getAccountNames().length !== 0) {
          curScreen = <WelcomeScreen changeScreen={(screenName) => this.setState({screen: screenName})}
                                     setAccState={(newState) => this.setState({account: newState})}/>
        } else {
          curScreen = <RegistrationScreen changeScreen={(screenName) => this.setState({screen: screenName})}
                                          setAccState={(newState) => this.setState({account: newState})}/>;
        }
        break;
      case 'register':
        curScreen = <RegistrationScreen changeScreen={(screenName) => this.setState({screen: screenName})}
                                        setAccState={(newState) => this.setState({account: newState})}/>;
        break;
      case 'send':
        curScreen = <SendScreen address='Dx39FuAa6VniKwPvPq7gRJYTyKLXULX14Na1yPTMdHVj' name='V1sionary'/>;
        break;
    }

    return (
        <div>
          {curScreen}
        </div>
    );
  }
}
