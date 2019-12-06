import React from 'react';
import Dropdown from './Dropdown';
import InputBlockMax from './InputBlockMax';
import Account from "../../Account";
import InputBlockF from "./InputBlockF";
import {Address, Client, feeValue, minBoxValue} from "@coinbarn/ergo-ts";
import {unitsInOneErgo} from "@coinbarn/ergo-ts/dist/constants";

interface SendTabProps {
  setCurrTab(n: number): void

  account: Account
}

interface SendTabState {
  formValid: boolean
}

export default class SendTab extends React.Component<SendTabProps, SendTabState> {

  tokenDropdownElement: any;
  addressElement: any;
  amountElement: any;

  constructor(props) {
    super(props);
    this.state = {
      formValid: false
    };

    this.tokenDropdownElement = React.createRef();
    this.addressElement = React.createRef();
    this.amountElement = React.createRef();
  }

  currentTokenId(): string {
    return 'ERG'
  }

  validateAddress = (address) => {
    const add = new Address(address);
    if (!add.isValid()) {
      return 'Invalid address';
    } else if (!add.isMainnet()) {
      return 'Mainnet address required';
    } else {
      return '';
    }
  };

  validateAmount = (amount) => {
    const tokenInfo = this.props.account.balances().find(t => t.tokenId === this.currentTokenId());
    if (tokenInfo === undefined) {
      return 'No such token';
    } else {
      let minValue;
      if (this.currentTokenId() === 'ERG') {
        minValue = minBoxValue / unitsInOneErgo
      } else {
        minValue = Math.pow(10, -tokenInfo.decimals);
      }

      if (amount < minValue) {
        return `Minimal amount ot send is ${minValue}`;
      } else if (amount > this.maxAmount()) {
        return 'Not enough balance';
      } else {
        return '';
      }
    }
  };

  /**
   * Max amount to send for selected token
   */
  maxAmount(): number {
    const tokenInfo = this.props.account.balances().find(t => t.tokenId === this.currentTokenId());
    if (tokenInfo === undefined) {
      return 0;
    } else if (this.currentTokenId() === 'ERG') {
      return tokenInfo.amount - (feeValue / unitsInOneErgo);
    } else {
      return tokenInfo.amount;
    }
  }

  onSend = async () => {
    const tokenId = this.currentTokenId();
    const amount = this.amountElement.current.state.value;
    const recipient = this.addressElement.current.state.value;
    const sk = this.props.account.sk;

    const client = new Client();
    const transferResult = await client.transfer(sk, recipient, amount, tokenId);
    console.log(transferResult);
    this.props.setCurrTab(1)

  };

  onUpdate = () => {
    const amountIsValid = this.amountElement.current.state.isValid;
    const recipientIsValid = this.addressElement.current.state.isValid;
    const formValid = amountIsValid && recipientIsValid;

    if (this.state.formValid !== formValid) {
      this.setState({formValid: formValid})
    }
  };


  render() {
    const tokenNames = this.props.account.balances().map(a => a.name);

    return (
      <div className='sendTab'>
        <div className='currencyDiv f2'>
          You send:
          <Dropdown ref={this.tokenDropdownElement} list={tokenNames}/>
        </div>
        <InputBlockF ref={this.addressElement}
                     large={true}
                     name='Address'
                     validate={this.validateAddress}
                     onUpdate={this.onUpdate}/>
        <InputBlockMax ref={this.amountElement}
                       large={true}
                       name='Amount'
                       validate={this.validateAmount}
                       maxValue={this.maxAmount()}
                       onUpdate={this.onUpdate}/>
        <button disabled={!this.state.formValid} className='mediumBtn' onClick={this.onSend}>Send</button>
      </div>
    );
  }
}
