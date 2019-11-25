import React from 'react';
import MenuBlock from '../elements/MenuBlock';
import TransactionsTab from '../elements/TransactionsTab';
import IssueTab from '../elements/IssueTab';
import SendTab from '../elements/SendTab';
import Header from '../elements/Header';
import Settings from '../elements/Settings';
import InfoProfile from '../elements/InfoProfile';

export default class SendScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsOn: false,
      menuBlockOn: false
    };
  }

  toggleSettings() {
    this.setState({settingsOn: !this.state.settingsOn});
  }
  toggleMenuBlock() {
    this.setState({menuBlockOn: !this.state.menuBlockOn});
  }

  render() {
    let settings = this.state.settingsOn ? <Settings /> : '';
    let menuBlock = this.state.menuBlockOn ? <MenuBlock /> : '';

    return (
        <div className="container container-p">
          <div className="screen screen-transaction">
            <Header toggleSettings={this.toggleSettings.bind(this)} toggleMenuBlock={this.toggleMenuBlock.bind(this)}/>
            <div className="wrap-content">
              <InfoProfile />
              <div className="wrap-main">
                <div className="tabs">
                  <SendTab/>
                  <TransactionsTab/>
                  <IssueTab/>
                </div>
              </div>
              {menuBlock}
              {settings}
            </div>

          </div>
        </div>
    );
  }
}

