import React from 'react';
import Dropdown from './elements/Dropdown'
import homaImg from '../img/homa_tea.svg';

interface WelcomeBackProps {
  updateState: (a: any) => void
  registeredAccounts: string[]
}

export default class WelcomeBackScreen extends React.Component<WelcomeBackProps, {}> {
  render() {
    return (
      <div className='welcomeBackScreen'>
        <div className='imgWrap'>
          <img src={homaImg} />
        </div>
        <div className='greeting'>
          Welcome back!
        </div>
        <Dropdown list={this.props.registeredAccounts} />
        <button className='largeBtn'> Continue </button>
        <div><a href='#' onClick={() => this.props.updateState({screen: 'register'})} >Create New Account</a></div>
        <div><a href='#'>Import Account</a></div>
      </div>
    );
  }
}

