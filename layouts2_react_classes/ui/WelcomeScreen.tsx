import React from 'react';
import homaImg from '../img/homa_lawn.svg';

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <div className='welcomeScreen'>
        <div className='imgWrap'>
          <img src={homaImg} />
        </div>
        <div className='greeting'>
          Welcome!
        </div>
        <button className='largeBtn'>Create Account</button>
        <button className='wiredBtn'>Import Account</button>
      </div>
    );
  }
}

