import React from 'react';
import logo from './logo.svg';
import './normalize.css';
import './style.css';
import Header from './ui/elements/Header';

class App extends React.Component {
  render () {
    return (
      <div class="container container-p">
          <Header />
        </div>
    );
  }
}

export default App;
