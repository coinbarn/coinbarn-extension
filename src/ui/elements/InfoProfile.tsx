import React from 'react';
import Account from "../../Account";
import avaSmallImg from '../../img/avatar_small.svg'
import Dropdown from './Dropdown'

declare const navigator;

interface IInfoProps {
  account: Account,
  updateAccountName: (newName: string) => boolean
}

interface IInfoState {
  account: Account,
  readOnlyAddress: boolean,
  invalidAddress: boolean
}

export default class InfoProfile extends React.Component<IInfoProps, IInfoState> {
  public accNameInput: any;

  constructor(props: IInfoProps) {
    super(props);
    this.state = {
      account: this.props.account,
      readOnlyAddress: true,
      invalidAddress: false
    };
    this.accNameInput = React.createRef();
  }

  public copyAddress = () => {
    navigator.clipboard.writeText(this.state.account.address);
  };

  public onEditAddressClick = () => {
    this.setState({readOnlyAddress: !this.state.readOnlyAddress},
      () => {
        if( this.state.readOnlyAddress ){
          this.accNameInput.current.blur();
        } else {
          this.accNameInput.current.focus();
        }
      });
  };

  public onAccountRename = () => {
    const newName = this.accNameInput.current.value;
    if (!this.props.updateAccountName(newName)) {
      this.setState({invalidAddress: true, readOnlyAddress: false}, () => {
        this.accNameInput.current.focus();
      });
    } else {
      this.setState({invalidAddress: false, readOnlyAddress: true});
    }
  };

  public render() {
    const balances = this.props.account.balances();
    const balanceList: string[] = balances.map(a => `${a.amount} ${a.name}`);
    return (
      <div className='profileInfo'>
        <div className='avatarDiv'>
          <img src={avaSmallImg} alt='homa'/>
        </div>
        <div className={'accountDiv'.concat(this.state.invalidAddress ? ' invalidInput' : '')}>
          <span className='nameInUseSpan'>Name is already in use</span>
          <div className='accountNameDiv'>
            <input className='addressInputSmall f2'
            defaultValue={this.state.account.name}
            ref={this.accNameInput}
            onBlur={this.onAccountRename}
            readOnly={this.state.readOnlyAddress} />
            <button className='editBtn' onClick={this.onEditAddressClick}/>
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
