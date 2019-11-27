import React from 'react';
import backImg from '../../img/ui/back-menu.png';
import backupImg from '../../img/ui/backup-s.png';
import deleteImg from '../../img/ui/delete-s.png';
import logoutImg from '../../img/ui/logout-s.png';
import closeImg from '../../img/ui/close-modal.png';

export default class Settings extends React.Component {
  render() {
    return (
      <div className='settings-block active'>
        <h3 className='note menu-title'>
          <a href="#" className='back'><img src={backImg} alt='back' onClick={this.props.toggle} /></a>Settings
        </h3>

        <div className='set-link'>
          <ul>
            <li><a href='#'><img src={backupImg} alt='' />Backup</a></li>
            <li><a href='#'><img src={deleteImg} alt='' />Delete account</a></li>
            <li><a href='#'><img src={logoutImg} alt='' />Log out</a></li>
          </ul>

          <div className='agree-del modal'>
            <a href='#' className='close-modal'><img src={closeImg} alt=''/></a>
            <h3 className='note menu-title'>
              Are you sure?
            </h3>
            <p className='text-modal'>Delete your account?</p>
            <a href='#' className='delete'>Delete</a>
          </div>
        </div>
      </div>
    );
  }
}

