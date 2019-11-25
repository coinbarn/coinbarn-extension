import React from 'react';
import logo from './logo.svg';
import './normalize.css';
import './style.css';
import SendScreen from './ui/screens/SendScreen';

class App extends React.Component {
  render() {
    return (
        <SendScreen/>
    );
  }
}

export default App;
