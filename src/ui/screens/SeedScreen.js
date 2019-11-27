import React from 'react';
import logo from '../../img/2screen/logo.jpg';
import back from '../../img/ui/back.png';
import refresh from '../../img/ui/refresh.png';
import copy from '../../img/ui/copy.png';
import {generateMnemonic, mnemonicToSeedSync} from 'bip39';
import {fromSeed} from 'bip32';
import {Address} from '@coinbarn/ergo-ts';
import zxcvbn from "zxcvbn";

export default class SeedScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
      repeatPhase: false,
      mnemonic: generateMnemonic(128),
      mnemonicBack: ''
    };
  }

  address() {
    const seed = mnemonicToSeedSync(this.state.mnemonic);
    const sk = SeedScreen.seedToSk(seed);
    return Address.fromSk(sk).address
  }

  static seedToSk(seed, path = "m/44'/429'/0'/0/0") {
    return fromSeed(Buffer.from(seed)).derivePath(path).privateKey.toString('hex');
  }

  handleUserInput(e) {
    const name = e.target.id;
    if (name === 'phrase') {
      const value = e.target.value;
      this.setState({mnemonicBack: value}, this.validateForm)
    }
  }

  validateForm() {
    const valid = this.state.mnemonic === this.state.mnemonicBack;
    this.setState({formValid: valid});
  }


  refreshMnemonic = () => {
    this.setState({mnemonic: generateMnemonic(128)})
  };

  copyToClipboard = () => {
    navigator.clipboard.writeText(this.state.mnemonic);
  };

  submit = () => {
    if(this.state.repeatPhase === false) {
      this.setState({repeatPhase: true, formValid: false});
    } else {
      // todo save to local storage
      this.props.changeScreen('send');
    }
  };


  message() {
    if (this.state.repeatPhase) {
      return <p>
        Сonfirm the Secret Backup Phrase.<br/> Type it below in the correct order
      </p>
    } else {
      return <p>
        Be sure to save <span className="green-note">Secret Backup Phrase.</span><br/> You can copy or write it
        on a
        piece of paper. Keep it in a safe place.
      </p>

    }
  }

  textarea() {
    if (this.state.repeatPhase) {
      return <textarea name="phrase" id="phrase" className="text-phrase" value={this.state.mnemonicBack}
                       onChange={this.handleUserInput.bind(this)}/>;
    } else {
      return <textarea name="phrase" id="phrase" className="text-phrase" readOnly value={this.state.mnemonic}/>;
    }
  }

  render() {

    return (
        <div className="container">

          <div className="screen screen-5">
            <div className="img-wrap">
              <img src={logo} alt="" className="logo"/>
            </div>


            <form action="#">
              <h4 className="subtitle">
                Secret Backup Phrase
              </h4>

              {this.message()}

              <div className="buttons-area">
                <a href="#" className="refresh" onClick={this.refreshMnemonic}><img src={refresh} alt="refresh"/></a>
                <a href="#" className="copy" onClick={this.copyToClipboard}><img src={copy} alt="copy"/></a>
              </div>

              {this.textarea()}

              <strong>Your address:</strong>
              <button className="link">{this.address()}</button>

              <div className="buttons">
                <input value="Continue" disabled={!this.state.formValid} className="button green-button continue"
                       onClick={this.submit}/>
                <a href="#" className="back"><img src={back} alt="back"/>Back</a>
              </div>

            </form>

          </div>
        </div>

    );
  }
}

