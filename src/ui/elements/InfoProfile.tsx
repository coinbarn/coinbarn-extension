import React from 'react';
import Account from "../../Account";
import avaSmallImg from '../../img/avatar_small.svg'
import Dropdown from './Dropdown'

declare const navigator;

interface IInfoProps {
  account: Account
}

interface IInfoState {
  account: Account
}

export default class InfoProfile extends React.Component<IInfoProps, IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
    this.state = {
      account: this.props.account
    };
    // todo change account
  }

  public copyAddress = () => {
    navigator.clipboard.writeText(this.state.account.address);
  };

  public render() {
    const balances = this.props.account.balances();
    const balanceList: string[] = balances.map(a => `${a.amount} ${a.name}`);
    return (
      <div className='profileInfo'>
        <div className='avatarDiv'>
          <img src={avaSmallImg} alt='homa'/>
        </div>
        <div className='accountDiv'>
          <span className='nameInUseSpan'>Name is already in use</span>
          <div className='accountNameDiv'>
            <input className='addressInputSmall f2' defaultValue={this.state.account.name}/>
            <button className='editBtn'></button>
          </div>
          <div>
            <button className='smallAddressBtn' onClick={this.copyAddress}>
              {this.props.account.address}
            </button>
            <div className='copiedDiv'>
              <span className='copiedSpan'>Copied</span>
            </div>
          </div>
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
