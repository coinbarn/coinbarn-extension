import {validateMnemonic} from "bip39";
import React from 'react';
import Account from "../Account";
import CoinbarnStorage from "../CoinbarnStorage";
import avaImg from '../img/avatar.svg';
import InputBlock from "./elements/InputBlock";

interface IPasswordProps {
  account: Account
  updateState: (a: any) => void
}

interface IPasswordState {
  account: Account
}

export default class PasswordScreen extends React.Component<IPasswordProps, IPasswordState> {
  public passElement: any;

  constructor(props: IPasswordProps) {
    super(props);
    this.state = {
      account: props.account
    };
    this.passElement = React.createRef();
  }

  public onSubmit = async () => {
    const pass = this.passElement.current.state.value;
    try {
      const newAcc = await CoinbarnStorage.getAccount(this.state.account.name, pass);
      if (!validateMnemonic(newAcc.mnemonic)) {
        // should never be here
        this.passElement.current.setState({isValid: false, error: 'Decrypted mnemonic is incorrect, db is broken'});
        console.log("Decrypted mnemonic is incorrect");
      }
      this.props.updateState({account: newAcc, screen: 'home'});
    } catch (e) {
      this.passElement.current.setState({isValid: false, error: 'Incorrect password'});
      console.log(`Incorrect password ${pass} for account ${this.state.account.name}: ${e}`);
    }
  };

  public render() {
    return (
      <div className='passwordScreen'>
        <div className='imgWrap'>
          <img src={avaImg} alt='Homa avatar'/>
        </div>
        <h1 id='accountName'> {this.state.account.name} </h1>
        <div id='requestDiv' className='ffn'> Password</div>
        <InputBlock name=''
                    ref={this.passElement}
                    type='password'
                    validate={() => {
                       return '';
                     }}/>
        <button className='largeBtn' onClick={this.onSubmit}>Continue</button>
        <div className='emptyDiv'></div>
        <button className='backBtn' onClick={() => this.props.updateState({screen: 'welcome'})}>Back</button>
      </div>
    );
  }
}

