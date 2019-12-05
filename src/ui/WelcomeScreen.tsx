import React from 'react';
import homaImg from '../img/homa_lawn.svg';

interface WelcomeProps {
  updateState: (a: any) => void
}

export default class WelcomeScreen extends React.Component<WelcomeProps, {}> {
  render() {
    return (
      <div className='welcomeScreen'>
        <div className='imgWrap'>
          <img src={homaImg} />
        </div>
        <div className='greeting'>
          Welcome!
        </div>
        <button className='largeBtn' onClick={() => this.props.updateState({screen: 'register'})}>Create Account</button>
        <button className='wiredBtn'>Import Account</button>
      </div>
    );
  }
}

