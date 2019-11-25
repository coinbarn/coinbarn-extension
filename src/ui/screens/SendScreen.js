import React from 'react';
import homa from '../../img/14screen/homa.jpg';
import avatar from '../../img/14screen/avatar.png';
import menu_icon from '../../img/ui/menu_icon.png';
import close_menu from '../../img/ui/close_menu.png';
import settings_icon from '../../img/ui/settings_icon.png';
import edit from '../../img/ui/edit.png';
import back_menu from '../../img/ui/back-menu.png';
import backup from '../../img/ui/backup-s.png';
import del from '../../img/ui/delete-s.png';
import logout from '../../img/ui/logout-s.png';
import close_modal from '../../img/ui/close-modal.png';
import MenuBlock from '../elements/MenuBlock';
import TransactionsTab from '../elements/TransactionsTab';
import IssueTab from '../elements/IssueTab';
import SendTab from '../elements/SendTab';
import Header from '../elements/Header';
import Settings from '../elements/Settings';

export default class SendScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsOpen: false
    };
  }

  toggleSettings() {
    this.setState({settingsOpen: !this.state.settingsOpen});
  }

  render() {
    let settings = this.state.settingsOpen ? <Settings /> : '';

    return (
        <div className="container container-p">
          <div className="screen screen-transaction">
            <Header toggleSettings={this.toggleSettings.bind(this)}/>

            <div className="wrap-content">
              <div className="info-profile">
                <div className="left-part">
                  <div className="img-wrap-ava">
                    <a href="#" className="avatar">
                      <img src={avatar} alt=""/>
                    </a>
                  </div>
                  <div className="text-wrap">
                    <h5 className="profile-name">V1sionary
                      <a href="#" className="edit-profile-name">
                        <img src={edit} alt=""/>
                      </a>
                    </h5>
                    <a href="#" className="link-info">Dx39FuAa6VniKwPvPq7gRJYTyKLXULX14Na1yPTMdHVj</a>
                    <span className="link-copied">Copied</span>
                  </div>
                </div>
                <div className="right-part">
                  <h5>Account balance: </h5>
                  <select name="select" id="">
                    <option value="val1">0.111 ERGS</option>
                    <option value="val2">0.111 ERGS</option>
                  </select>
                </div>
              </div>

              <div className="wrap-main">
                <div className="tabs">

                  <SendTab/>
                  <TransactionsTab/>
                  <IssueTab/>

                </div>
              </div>
              <MenuBlock/>
              {settings}
            </div>

          </div>
        </div>
    );
  }
}

