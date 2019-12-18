import {Address, minBoxValue} from "@coinbarn/ergo-ts";
import {unitsInOneErgo} from "@coinbarn/ergo-ts/dist/constants";
import React from 'react';
import Account from "../../Account";
import CoinbarnClient from "../../CoinbarnClient";
import Constants from "../../Constants";
import Utils from "../../Utils";
import Dropdown from './Dropdown';
import InputBlock from "./inputs/InputBlock";
import InputBlockMax from './inputs/InputBlockMax';
import {IPopupStatus} from "./Popup";

interface ISendTabProps {
  account: Account

  setPopup(p: IPopupStatus): void
}

interface ISendTabState {
  formValid: boolean
}

export default class SendTab extends React.Component<ISendTabProps, ISendTabState> {

  public tokenDropdownElement: any = React.createRef();
  public addressElement: any = React.createRef();
  public amountElement: any = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      formValid: false
    };
  }

  public currentTokenId(): string {
    try {
      return this.tokenDropdownElement.current.currentKey();
    } catch {
      return 'ERG'
    }
  }

  public currentTokenName(): string {
    if (this.tokenDropdownElement.current) {
      return this.tokenDropdownElement.current.currentValue();
    } else {
      return 'ERG'
    }
  }

  public validateAddress = (address) => {
    try {
      const add = new Address(address);
      if (!add.isValid()) {
        return 'Invalid address';
      } else if (!add.isMainnet()) {
        return 'Mainnet address required';
      } else {
        return '';
      }
    } catch {
      return 'Invalid address';
    }
  };

  public validateAmount = (amount) => {
    if (amount === '') {
      return ''
    }
    const balances = this.props.account.balances();
    const tokenInfo = balances.find(t => t.tokenId === this.currentTokenId());
    if (tokenInfo === undefined) {
      console.log(`TokenId: ${this.currentTokenId()}, balances:${JSON.stringify(balances)}`);
      return 'No such token';
    } else {
      let minValue;
      if (this.currentTokenId() === 'ERG') {
        minValue = minBoxValue / unitsInOneErgo
      } else {
        minValue = Math.pow(10, -tokenInfo.decimals);
      }

      const maxAmount = this.maxAmount();
      if (amount < minValue) {
        return `Minimal amount ot send is ${minValue}`;
      } else if (amount > maxAmount) {
        return `Available balances is ${maxAmount}`;
      } else {
        return '';
      }
    }
  };

  /**
   * Max amount to send for selected token
   */
  public maxAmount(): number {
    const balances = this.props.account.balances();
    const tokenInfo = balances.find(t => t.tokenId === this.currentTokenId());
    if (tokenInfo === undefined) {
      return 0;
    } else if (this.currentTokenId() === 'ERG') {
      let feeWithCharge = Constants.fee;
      if (balances.find((e) => (e.tokenId !== 'ERG')) !== undefined) {
        // there are tokens -> leave fee more to keep tokens
        feeWithCharge += Constants.fee;
      }
      return Utils.fixedFloat(tokenInfo.amount - (feeWithCharge / unitsInOneErgo), 9);
    } else {
      return tokenInfo.amount;
    }
  }

  public onSend = async () => {
    try {
      const tokenId = this.currentTokenId();
      const amount = this.amountElement.current.state.value;
      const recipient = this.addressElement.current.state.value;
      const client = new CoinbarnClient();
      const result = await client.transfer(this.props.account, recipient, amount, tokenId);
      if (result.data.id) {
        const tokenName = this.currentTokenName();
        const id: string = result.data.id.substring(1, 65);
        const explorerHref = `${Constants.explorerURL}/en/transactions/${id}`;
        this.props.setPopup(
          {
            show: true,
            title: 'Congrats!',
            line1: `You have send ${amount} ${tokenName} to ${recipient.slice(0, 10)}...`,
            line2: <a target="_blank" rel="noopener noreferrer" href={explorerHref}>View transaction</a>
          }
        );
      } else {
        const details = result.data.detail || JSON.stringify(result.data);
        this.props.setPopup(
          {
            show: true,
            title: 'Error!',
            line1: `Transaction send error`,
            line2: details
          }
        );
      }
    } catch (e) {
        this.props.setPopup(
          {
            show: true,
            title: 'Error!',
            line1: `Transaction send error`,
            line2: e.message
          }
        );
    }
  };

  public onUpdate = () => {
    this.amountElement.current.setState({maxValue: this.maxAmount()});
    const amountIsValid = this.amountElement.current.state.isValid;
    const recipientIsValid = this.addressElement.current.state.isValid;
    const formValid = amountIsValid && recipientIsValid;

    if (this.state.formValid !== formValid) {
      this.setState({formValid: formValid})
    }
  };

  public render() {
    const balances = this.props.account.balances();
    const tokenNames = balances.map(a => a.name);
    const tokenKeys = balances.map(a => a.tokenId);

    return (
      <div className='sendTab'>
        <div className='currencyDiv f2'>
          You send:
          <Dropdown ref={this.tokenDropdownElement}
                    list={tokenNames}
                    keys={tokenKeys}
                    onUpdate={this.onUpdate.bind(this)}/>
        </div>
        <InputBlock ref={this.addressElement}
                    large={true}
                    name='Address'
                    validate={this.validateAddress.bind(this)}
                    onUpdate={this.onUpdate}/>
        <InputBlockMax ref={this.amountElement}
                       large={true}
                       name='Amount'
                       validate={this.validateAmount.bind(this)}
                       maxValue={this.maxAmount()}
                       onUpdate={this.onUpdate}/>
        <button disabled={!this.state.formValid} className='mediumBtn' onClick={this.onSend}>Send</button>
      </div>
    );
  }
}
