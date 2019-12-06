import React from 'react';
import homaImg from '../img/homa_lawn.svg';

interface IWelcomeProps {
  updateState: (a: any) => void
}

export default class WelcomeScreen extends React.Component<IWelcomeProps, {}> {
  public render() {
    return (
      <div className='welcomeScreen'>
        <div className='imgWrap'>
          <img src={homaImg} alt='Homa'/>
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

