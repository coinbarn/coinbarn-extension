import React from 'react';
import Dropdown from './elements/Dropdown'
import homaImg from '../img/homa_tea.svg';
import Account from "../Account";

interface WelcomeBackProps {
  updateState: (a: any) => void
  registeredAccounts: string[]
}

export default class WelcomeBackScreen extends React.Component<WelcomeBackProps, {}> {
  dropdownElement: any;

  constructor(props) {
    super(props);
    this.dropdownElement = React.createRef();
  }

  submit = () => {
    const name = this.dropdownElement.current.state.currentValue;
    const newState = {
      account: new Account(name, ''),
      screen: 'password'
    };
    this.props.updateState(newState);
  };

  render() {
    return (
      <div className='welcomeBackScreen'>
        <div className='imgWrap'>
          <img src={homaImg}/>
        </div>
        <div className='greeting'>
          Welcome back!
        </div>
        <Dropdown ref={this.dropdownElement} list={this.props.registeredAccounts}/>
        <button className='largeBtn' onClick={this.submit}> Continue</button>
        <div><a href='#' onClick={() => this.props.updateState({screen: 'register'})}>Create New Account</a></div>
        <div><a href='#'>Import Account</a></div>
      </div>
    );
  }
}

