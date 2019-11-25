import React from 'react';
import backImg from '../../img/ui/back-menu.png';
import backupImg from '../../img/ui/backup-s.png';
import deleteImg from '../../img/ui/delete-s.png';
import logoutImg from '../../img/ui/logout-s.png';
import closeImg from '../../img/ui/close-modal.png';

export default class Settings extends React.Component {
  render() {
    return (
      <div class='wrap-content'>
        <div class='settings-block active'>
          <h3 class='note menu-title'>
            <a href="#" class='back'><img src={backImg} alt='back'/></a>Settings
          </h3>

          <div class='set-link'>
            <ul>
              <li><a href='#'><img src={backupImg} alt='' />Backup</a></li>
              <li><a href='#'><img src={deleteImg} alt='' />Delete account</a></li>
              <li><a href='#'><img src={logoutImg} alt='' />Log out</a></li>
            </ul>

            <div class='agree-del modal'>
              <a href='#' class='close-modal'><img src={closeImg} alt=''/></a>
              <h3 class='note menu-title'>
                Are you sure?
              </h3>
              <p class='text-modal'>Delete your account?</p>
              <a href='#' class='delete'>Delete</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

