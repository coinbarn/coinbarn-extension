import {generateMnemonic} from "bip39";
import React from 'react';
import Account from "../Account";
import CoinbarnStorage from "../CoinbarnStorage";
import homaImg from '../img/homa_register.svg';

declare const navigator;

interface ISeedProps {
  account: Account
  updateState: (a: any) => void
  screenData: string
}

interface ISeedState {
  mnemonic: string
  mnemonicBack: string
  seedFormValid: boolean
  repeatPhase: boolean
}

export default class SeedScreen extends React.Component<ISeedProps, ISeedState> {

  constructor(props) {
    super(props);
    this.state = {
      mnemonic: generateMnemonic(128),
      mnemonicBack: '',
      repeatPhase: false,
      seedFormValid: false
    };
  }


  public validateSeedForm() {
    const valid = this.state.mnemonic === this.state.mnemonicBack;
    this.setState({seedFormValid: valid});
  }


  public refreshMnemonic = () => {
    this.setState({mnemonic: generateMnemonic(128)})
  };

  public copyMnemonic = () => {
    navigator.clipboard.writeText(this.state.mnemonic);
  };

  public copyAddress = () => {
    navigator.clipboard.writeText(Account.mnemonicToAddress(this.state.mnemonic));
  };

  public handleSeedUserInput(e) {
    this.setState({mnemonicBack: e.target.value}, this.validateSeedForm)
  }


  public submitSeed = async () => {
    if (this.state.repeatPhase === false) {
      this.setState({repeatPhase: true, seedFormValid: false});
    } else {
      const address = Account.mnemonicToAddress(this.state.mnemonic);
      const newAcc = new Account(this.props.account.name, address);
      await CoinbarnStorage.saveAccount(this.props.account.name, this.props.screenData, this.state.mnemonic);
      this.props.updateState({account: newAcc, screen: 'start', screenData: ''});
    }
  };

  public onBack = async () => {
    if (!this.state.repeatPhase) {
      this.props.updateState({screen: 'register'})
    } else {
      this.setState({repeatPhase: false, seedFormValid: true});
    }
  };

  public render() {
    let message;
    let textarea;
    let buttons;
    if (!this.state.repeatPhase) {
      message = <div id='descriptionDiv'>
        Be sure to save <strong>Secret Backup Phrase</strong>. <br/>
        You can copy or write it on a piece of paper. <br/>
        Keep it in a safe place.
      </div>;
      textarea = <textarea className='ffn' readOnly={true} value={this.state.mnemonic}/>;
      buttons = <div id='textButtons'>
          <button className='refreshSeedBtn' onClick={this.refreshMnemonic}/>
          <button className='copySeedBtn' onClick={this.copyMnemonic}/>
        </div>;
    } else {
      message = <div id='descriptionDiv'>
        Confirm the Secret Backup Phrase.<br/> Type it below in the correct order
      </div>;
      textarea =
        <textarea className='ffn' value={this.state.mnemonicBack} onChange={this.handleSeedUserInput.bind(this)}/>;
      buttons = '';
    }

    return (
      <div className='registerScreen'>
        <div className='imgWrap'>
          <img src={homaImg} alt='Homa'/>
        </div>

        <h1>Secret Backup Phrase</h1>

        {message}

        {buttons}

        {textarea}

        <div className='addressParams'>
          <strong>Your address:</strong>
          <button className='fullAddressBtn' onClick={this.copyAddress}>
            {Account.mnemonicToAddress(this.state.mnemonic)}
          </button>
        </div>

        <div className='registrationControls'>
          <button className='largeBtn' onClick={this.submitSeed}>Continue</button>
          <button className='backBtn' onClick={this.onBack}>Back</button>
        </div>

      </div>
    );
  }
}

