import React from 'react';
import avaSmallImg from '../../img/avatar_small.svg'
import Dropdown from './Dropdown'
import PublicAccount from "../../PublicAccount";

declare const navigator;

interface InfoProps {
  account: PublicAccount
}

interface InfoState {
  account: PublicAccount
}

export default class InfoProfile extends React.Component<InfoProps, InfoState> {
  constructor(props: InfoProps) {
    super(props);
    this.state = {
      account: this.props.account
    };
    //todo change account
  }

  copyAddress = () => {
    navigator.clipboard.writeText(this.state.account.address);
  };

  render() {
    const balances = this.props.account.balances();
    console.log(`!! ${balances}`);
    const balanceList: string[] = balances.map(a => `${a['amount']} ${a['tokenId']}`);
    return (
      <div className='profileInfo'>
        <div className='avatarDiv'>
          <img src={avaSmallImg}/>
        </div>
        <div className='accountDiv'>
          <span className='nameInUseSpan'>Name is already in use</span>
          <div className='accountNameDiv'>
            <input className='addressInputSmall f2' value={this.state.account.name}/>
            <button className='editBtn'></button>
          </div>
          <button className='smallAddressBtn' onClick={this.copyAddress}>
            {this.props.account.address}
          </button>
          <span className='copiedSpan'>Copied</span>
        </div>
        <div className='spacerDiv'>
        </div>
        <div className='balanceDiv'>
          <div className='balanceText ffn'>
            Account balance:
          </div>
          <Dropdown list={balanceList}/>
        </div>
      </div>
    );
  }
}
