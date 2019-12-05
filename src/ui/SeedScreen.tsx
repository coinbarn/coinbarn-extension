import React from 'react';
import homaImg from '../img/homa_register.svg';
import PublicAccount from "../PublicAccount";
import {generateMnemonic} from "bip39";
import CoinbarnStorage from "../CoinbarnStorage";

declare const navigator;

interface SeedProps {
  account: PublicAccount
  updateState: (a: any) => void
  screenData: string
}

interface SeedState {
  mnemonic: string
  mnemonicBack: string
  seedFormValid: boolean
  repeatPhase: boolean
}

export default class SeedScreen extends React.Component<SeedProps, SeedState> {

  constructor(props) {
    super(props);
    this.state = {
      mnemonic: generateMnemonic(128),
      mnemonicBack: '',
      seedFormValid: false,
      repeatPhase: false
    };
  }


  validateSeedForm() {
    const valid = this.state.mnemonic === this.state.mnemonicBack;
    this.setState({seedFormValid: valid});
  }


  refreshMnemonic = () => {
    this.setState({mnemonic: generateMnemonic(128)})
  };

  copyMnemonic = () => {
    navigator.clipboard.writeText(this.state.mnemonic);
  };

  copyAddress = () => {
    navigator.clipboard.writeText(PublicAccount.mnemonicToAddress(this.state.mnemonic));
  };

  handleSeedUserInput(e) {
    this.setState({mnemonicBack: e.target.value}, this.validateSeedForm)
  }


  submitSeed = async () => {
    if (this.state.repeatPhase === false) {
      this.setState({repeatPhase: true, seedFormValid: false});
    } else {
      const address = PublicAccount.mnemonicToAddress(this.state.mnemonic);
      const newAcc = new PublicAccount(this.props.account.name, address);
      await CoinbarnStorage.saveAccount(this.props.account.name, this.props.screenData, this.state.mnemonic);
      this.props.updateState({account: newAcc, screen: 'start', screenData: ''});
    }
  };

  onBack = async () => {
    if (!this.state.repeatPhase) {
      this.props.updateState({screen: 'register'})
    } else {
      this.setState({repeatPhase: false, seedFormValid: true});
    }
  };

  render() {
    let message;
    let textarea;
    if (!this.state.repeatPhase) {
      message = <div id='descriptionDiv'>
        Be sure to save <strong>Secret Backup Phrase</strong>. <br/>
        You can copy or write it on a piece of paper. <br/>
        Keep it in a safe place.
      </div>;
      textarea = <textarea className='ffn' readOnly={true} value={this.state.mnemonic}/>;
    } else {
      message = <div id='descriptionDiv'>
        Confirm the Secret Backup Phrase.<br/> Type it below in the correct order
      </div>;
      textarea =
        <textarea className='ffn' value={this.state.mnemonicBack} onChange={this.handleSeedUserInput.bind(this)}/>;
    }

    return (
      <div className='registerScreen'>
        <div className='imgWrap'>
          <img src={homaImg} alt='Homa'/>
        </div>

        <h1>Secret Backup Phrase</h1>

        {message}

        <div id='textButtons'>
          <button className='refreshSeedBtn' onClick={this.refreshMnemonic}/>
          <button className='copySeedBtn' onClick={this.copyMnemonic}/>
        </div>

        {textarea}

        <div className='addressParams'>
          <strong>Your address:</strong>
          <button className='fullAddressBtn' onClick={this.copyAddress}>
            {PublicAccount.mnemonicToAddress(this.state.mnemonic)}
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

