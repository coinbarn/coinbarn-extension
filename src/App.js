import React from 'react';
import logo from './logo.svg';
import './normalize.css';
import './style.css';
import WelcomeScreen from './ui/screens/WelcomeScreen';

class App extends React.Component {
  render () {
    return (
      <div class="container">
        <WelcomeScreen />
      </div>
    );
  }
}

export default App;
