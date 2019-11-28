import React, {RefObject} from 'react';
import back from "../../img/ui/back.png";
import homa3 from "../../img/1screen/homa3.png";
import PublicAccount from "../../PublicAccount";
import Back from "../elements/Back";
import {AppState} from "../../App";
import Continue from "../elements/Continue";
import CoinbarnStorage from "../../CoinbarnStorage";
import {validateMnemonic} from "bip39";

interface PasswordProps {
  account: PublicAccount
  updateState: (a: any) => void
}

interface PasswordState {
  account: PublicAccount
  pass: string
}

export default class PasswordScreen extends React.Component<PasswordProps, PasswordState> {

  constructor(props: PasswordProps) {
    super(props);
    this.state = {
      account: props.account,
      pass: ''
    };
  }

  onSubmit = async () => {
    try {
      const mnemonic = await CoinbarnStorage.getMnemonic(this.state.account.name, this.state.pass);
      if (validateMnemonic(mnemonic)) {
        const newAcc = PublicAccount.fromMnemonic(this.state.account.name, mnemonic);
        this.props.updateState({account: newAcc, screen: 'send'});
      } else {
        console.log("Mnemoic is incorrect than should never happen")
      }
    } catch (e) {
      console.log(`Failed to decrypt mnemonic: ${e}`)
    }
  };

  handlePassChange(e) {
    const value = e.target.value;
    this.setState({pass: value})
  }


  render() {
    return (
      <div className="container">
        <div className="screen screen-1 welcome">
          <div className="img-wrap">
            <img className="homa-screen-1" src={homa3} alt="homa"/>
          </div>
          <h2 className="enter-name">{this.state.account.name}</h2>

          <div className="enter-pass">
            <form action="#">
              <label htmlFor="">
                <strong>
                  Password
                </strong>
                <input type="password" value={this.state.pass} onChange={this.handlePassChange.bind(this)}/>
              </label>

              <div className="buttons">
                <Continue submit={this.onSubmit} disabled={false}/>
              </div>
            </form>
          </div>
          <div className="account-links">
            <p>
              <Back onBack={() => this.props.updateState({screen: 'welcome'})}/>
            </p>
          </div>

        </div>
      </div>
    );
  }
}

