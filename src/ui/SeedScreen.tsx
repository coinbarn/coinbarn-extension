import {generateMnemonic, validateMnemonic} from "bip39";
import React from 'react';
import Account from "../Account";
import CoinbarnStorage from "../CoinbarnStorage";
import homaImg from '../img/homa_register.svg';

declare const navigator;

interface ISeedProps {
  account: Account
  updateState: (a: any) => void
  regPassword: string
  regRecover: boolean
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
      seedFormValid: true
    };
  }


  public validateSeedForm() {
    let valid;
    if (this.props.regRecover) {
      valid = validateMnemonic(this.state.mnemonicBack)
    } else {
      valid = this.state.mnemonic === this.state.mnemonicBack;
    }
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
    if (this.state.repeatPhase || this.props.regRecover) {
      const newAcc = new Account(this.props.account.name, this.state.mnemonicBack);
      await CoinbarnStorage.saveAccount(this.props.account.name, this.props.regPassword, this.state.mnemonicBack);
      this.props.updateState({account: newAcc, screen: 'start', screenData: ''});
    } else {
      this.setState({repeatPhase: true, seedFormValid: false});
    }
  };

  public onBack = async () => {
    if (!this.state.repeatPhase) {
      this.props.updateState({screen: 'register'})
    } else {
      this.setState({repeatPhase: false, seedFormValid: true});
    }
  };

  public address() {
    if (this.state.repeatPhase || this.props.regRecover) {
      return Account.mnemonicToAddress(this.state.mnemonicBack)
    } else {
      return Account.mnemonicToAddress(this.state.mnemonic)
    }
  }

  public render() {
    let message;
    let textarea;
    let buttons;
    if (this.state.repeatPhase || this.props.regRecover) {
      if(this.props.regRecover) {
        message = <div id='descriptionDiv'>
          Enter your <strong>Secret Backup Phrase</strong> to access your wallet
        </div>;
      } else {
        message = <div id='descriptionDiv'>
          Confirm the Secret Backup Phrase.<br/> Type it below in the correct order
        </div>;
      }
      textarea =
        <textarea className='ffn' value={this.state.mnemonicBack} onChange={this.handleSeedUserInput.bind(this)}/>;
      buttons = '';
    } else {
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
            {this.address()}
          </button>
          <div className='copiedDiv'>
            <span className='copiedSpan'>Copied</span>
          </div>
        </div>

        <div className='registrationControls'>
          <button disabled={!this.state.seedFormValid} className='largeBtn' onClick={this.submitSeed}>Continue</button>
          <button className='backBtn' onClick={this.onBack}>Back</button>
        </div>

      </div>
    );
  }
}

