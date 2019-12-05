import React from 'react';
import avaImg from '../img/avatar.svg';
import PublicAccount from "../PublicAccount";
import {validateMnemonic} from "bip39";
import CoinbarnStorage from "../CoinbarnStorage";
import InputBlockF from "./elements/InputBlockF";

interface PasswordProps {
  account: PublicAccount
  updateState: (a: any) => void
}

interface PasswordState {
  account: PublicAccount
}

export default class PasswordScreen extends React.Component<PasswordProps, PasswordState> {
  passElement: any;

  constructor(props: PasswordProps) {
    super(props);
    this.state = {
      account: props.account
    };
    this.passElement = React.createRef();

  }

  onSubmit = async () => {
    const pass = this.passElement.current.state.value;
    try {
      const mnemonic = await CoinbarnStorage.getMnemonic(this.state.account.name, pass);
      if (validateMnemonic(mnemonic)) {
        const newAcc = PublicAccount.fromMnemonic(this.state.account.name, mnemonic);
        this.props.updateState({account: newAcc, screen: 'start'});
      } else {
        this.passElement.current.setState({isValid: false, error: 'Decrypted mnemonic is incorrect'});
        console.log("Decrypted mnemonic is incorrect");
      }
    } catch (e) {
      this.passElement.current.setState({isValid: false, error: 'Incorrect password'});
      console.log(`Incorrect password ${pass} for account ${this.state.account.name}: ${e}`);
    }
  };

  render() {
    return (
      <div className='registerScreen'>
        <div className='imgWrap'>
          <img src={avaImg} alt='Homa avatar'/>
        </div>
        <h1 id='accountName'> {this.state.account.name} </h1>
        <div id='requestDiv' className='ffn'> Password</div>
        <InputBlockF name=''
                     ref={this.passElement}
                     isPassword={true}
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

