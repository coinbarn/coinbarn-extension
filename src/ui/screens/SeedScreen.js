import React from 'react';
import logo from '../../img/2screen/logo.jpg';
import back from '../../img/ui/back.png';
import refresh from '../../img/ui/refresh.png';
import copy from '../../img/ui/copy.png';
import {generateMnemonic, mnemonicToSeedSync} from 'bip39';
import {fromSeed} from 'bip32';
import {Address} from '@coinbarn/ergo-ts';

export default class SeedScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mnemonic: generateMnemonic(128)
    };
  }

  address() {
    const seed = mnemonicToSeedSync(this.state.mnemonic);
    const sk = this.seedToSk(seed);
    return Address.fromSk(sk).address
  }

  seedToSk(seed, path = "m/44'/429'/0'/0/0") {
    return fromSeed(Buffer.from(seed)).derivePath(path).privateKey.toString('hex');
  }

  refreshMnemonic() {
    console.log(`refresh`);
    this.state.mnemonic = generateMnemonic(128);
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

              <p>
                Be sure to save <span className="green-note">Secret Backup Phrase.</span><br/> You can copy or write it
                on a
                piece of paper. Keep it in a safe place.

              </p>

              <div className="buttons-area">
                <a href="#" className="refresh" onClick={this.refreshMnemonic()}><img src={refresh} alt="refresh"/></a>
                <a href="#" className="copy"><img src={copy} alt="copy"/></a>
              </div>

              <textarea name="phrase" id="phrase" className="text-phrase" value={this.state.mnemonic}/>

              <strong>Your address:</strong>
              <button className="link">{this.address()}</button>

              <div className="buttons">
                <input type="submit" value="Continue" className="button green-button continue"/>
                <a href="#" className="back"><img src={back} alt="back"/>Back</a>
              </div>

            </form>

          </div>
        </div>

    );
  }
}

