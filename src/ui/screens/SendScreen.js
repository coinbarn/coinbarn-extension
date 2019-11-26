import React from 'react';
import MenuBlock from '../elements/MenuBlock';
import Tabs from '../elements/Tabs';
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
    let settings = this.state.settingsOn ? <Settings toggle={this.toggleSettings.bind(this)} /> : '';
    let menuBlock = this.state.menuBlockOn ? <MenuBlock toggle={this.toggleMenuBlock.bind(this)} /> : '';

    return (
        <div className="container container-p">
          <div className="screen screen-transaction">
            <Header toggleSettings={this.toggleSettings.bind(this)} toggleMenuBlock={this.toggleMenuBlock.bind(this)}/>
            <div className="wrap-content">
              <InfoProfile address={this.props.address} name={this.props.name} />
              <Tabs />
              {menuBlock}
              {settings}
            </div>

          </div>
        </div>
    );
  }
}

