import React from 'react';
import './normalize.css';
import './style.css';
import './dropdown.css';
import WelcomeScreen from './ui/screens/WelcomeScreen';
import SendScreen from './ui/screens/SendScreen';
import RegistrationScreen from "./ui/screens/RegistrationScreen";
import PublicAccount from "./PublicAccount";


interface AppProps {}

interface AppState {
  account: PublicAccount
  screen: string
}

export default class App extends React.Component<AppProps, AppState> {

  constructor(props:AppProps) {
    super(props);
    this.state = {
      account: new PublicAccount('', ''),
      screen: 'welcome'
      // screen: 'send'
    };
  }

  render() {

      let curScreen = <div>Unknown screen ${this.state.screen}</div>;
    switch (this.state.screen) {
      case 'welcome':
        curScreen = <WelcomeScreen changeScreen={(screenName: string) => this.setState({screen: screenName})}
                                   setAccState={(newState: PublicAccount) => this.setState({account: newState})}/>;
        break;
      case 'register':
        curScreen = <RegistrationScreen changeScreen={(screenName: string) => this.setState({screen: screenName})}
                                        setAccState={(newState:PublicAccount) => this.setState({account: newState})}/>;
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
