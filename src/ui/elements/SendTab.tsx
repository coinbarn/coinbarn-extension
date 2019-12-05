import React from 'react';
import Dropdown from './Dropdown';
import InputBlock from './InputBlock';
import InputBlockMax from './InputBlockMax';
import PublicAccount from "../../PublicAccount";
import InputBlockF from "./InputBlockF";
import {Address, feeValue} from "@coinbarn/ergo-ts";
import {unitsInOneErgo} from "@coinbarn/ergo-ts/dist/constants";

interface SendTabState {
  currentTokenId: string
}

interface SendTabProps {
  account: PublicAccount
}

export default class SendTab extends React.Component<SendTabProps, SendTabState> {

  constructor(props) {
    super(props);
    this.state = {
      currentTokenId: 'ERG'
    }
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
    const tokenInfo = this.props.account.balances().find(t => t.tokenId == this.state.currentTokenId);
    if (tokenInfo === undefined) {
      return 'No such token';
    } else {
      if (amount > this.maxAmount()) {
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
    const tokenInfo = this.props.account.balances().find(t => t.tokenId == this.state.currentTokenId);
    if (tokenInfo === undefined) {
      return 0;
    } else if (this.state.currentTokenId !== 'ERG') {
      return tokenInfo.amount;
    } else {
      return tokenInfo.amount;
    }
  }

  render() {
    // todo
    const balances = this.props.account.balances();
    const tokenNames = balances.map(a => a.name);

    return (
      <div className='sendTab'>
        <div className='currencyDiv f2'>
          You send:
          <Dropdown list={tokenNames}/>
        </div>
        <InputBlockF large={true} name='Address' validate={this.validateAddress}/>
        <InputBlockMax large={true} name='Amount' validate={this.validateAmount} maxValue={this.maxAmount()}/>
        <button className='mediumBtn'>Send</button>
      </div>
    );
  }
}
