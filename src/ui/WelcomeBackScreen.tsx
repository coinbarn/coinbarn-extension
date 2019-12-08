import React from 'react';
import Account from "../Account";
import homaImg from '../img/homa_tea.svg';
import Dropdown from './elements/Dropdown'

interface IWelcomeBackProps {
  updateState: (a: any) => void
  registeredAccounts: string[]
}

export default class WelcomeBackScreen extends React.Component<IWelcomeBackProps, {}> {
  public dropdownElement: any = React.createRef();

  public submit = () => {
    const name = this.dropdownElement.current.currentValue();
    const newState = {
      account: new Account(name, ''),
      screen: 'password'
    };
    this.props.updateState(newState);
  };

  public render() {
    return (
      <div className='welcomeBackScreen'>
        <div className='imgWrap'>
          <img src={homaImg} alt='homa'/>
        </div>
        <div className='greeting'>
          Welcome back!
        </div>
        <Dropdown ref={this.dropdownElement} list={this.props.registeredAccounts}/>
        <button className='largeBtn' onClick={this.submit}> Continue</button>
        <div><a href='#' onClick={() => this.props.updateState({screen: 'register', regRecover: false})}>Create New Account</a></div>
        <div><a href='#' onClick={() => this.props.updateState({screen: 'register', regRecover: true})}>Import Account</a></div>
      </div>
    );
  }
}

