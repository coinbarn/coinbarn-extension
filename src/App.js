import React from 'react';
import './normalize.css';
import './style.css';
import WelcomeScreen from './ui/screens/WelcomeScreen';
import SendScreen from './ui/screens/SendScreen';


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
        curScreen = <WelcomeScreen/>;
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
