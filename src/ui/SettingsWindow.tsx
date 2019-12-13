import React from 'react';
import backupImg from '../img/backup.svg';
import deleteImg from '../img/delete.svg';
import logoutImg from '../img/log_out.svg';

interface ISettingsWindowProps {
  toggle: (a: any) => void
}


export default class SettingsWindow extends React.Component<ISettingsWindowProps> {
  public render() {
    return (
      <div className='menu'>
        <button className='backBtnWhite' onClick={this.props.toggle}></button>
        <div className='greeting'>Settings</div>
        <ul className='settingsList'>
          <li><h1><img src={backupImg} />Backup</h1></li>
          <li><h1><img src={deleteImg} />Delete account</h1></li>
          <li><h1><img src={logoutImg} />Log out</h1></li>
        </ul>
      </div>
    );
  }
}

