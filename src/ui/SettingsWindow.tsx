import React from 'react';
import backupImg from '../img/backup.svg';
import deleteImg from '../img/delete.svg';
import logoutImg from '../img/log_out.svg';
import Account from "../Account";
import CoinbarnStorage from "../CoinbarnStorage";

declare const navigator;

interface ISettingsWindowProps {
  onLogout: () => void
  toggle: () => void
  account: Account
}


export default class SettingsWindow extends React.Component<ISettingsWindowProps> {

  public copyMnemonic = () => {
    navigator.clipboard.writeText(this.props.account.mnemonic);
  };

  public logout = () => {
    this.props.onLogout()
  };

  public deleteAcc = () => {
    // TODO request confirmation?
    CoinbarnStorage.deleteAccount(this.props.account.name);
    this.props.onLogout();
  };

  public render() {
    return (
      <div className='menu'>
        <button className='backBtnWhite' onClick={this.props.toggle} />
        <div className='greeting'>Settings</div>
        <ul className='settingsList'>
          <li onClick={this.copyMnemonic}><h1><img src={backupImg}/>Backup</h1></li>
          <div className='copiedDiv'>
            <span className='copiedSpan'>Copied</span>
          </div>
          <li onClick={this.deleteAcc}><h1><img src={deleteImg}/>Delete account</h1></li>
          <li onClick={this.logout}><h1><img src={logoutImg}/>Log out</h1></li>
        </ul>
      </div>
    );
  }
}

