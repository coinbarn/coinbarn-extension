import React from 'react';
import Dropdown from './elements/Dropdown'
import homaImg from '../img/homa_tea.svg';

export default class WelcomeBackScreen extends React.Component {
  render() {
    return (
      <div className='welcomeBackScreen'>
        <div className='imgWrap'>
          <img src={homaImg} />
        </div>
        <div className='greeting'>
          Welcome back!
        </div>
        <Dropdown list={['a','b','c']} />
        <button className='largeBtn'> Continue </button>
        <div><a href='#'>Create New Account</a></div>
        <div><a href='#'>Import Account</a></div>
      </div>
    );
  }
}

