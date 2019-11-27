import React from 'react';
import homaImg from '../../img/14screen/homa.jpg';
import menuImg from '../../img/ui/menu_icon.png';
import closeImg from '../../img/ui/close_menu.png';
import settingsImg from '../../img/ui/settings_icon.png';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsOn: false,
      menuBlockOn: false
    };
  }

  toggleSettings() {
    this.props.toggleSettings();
    this.setState({settingsOn: !this.state.settingsOn});
  }

  toggleMenuBlock() {
    this.props.toggleMenuBlock();
    this.setState({menuBlockOn: !this.state.menuBlockOn});
  }

  render() {
    let rightImg = this.state.settingsOn ? closeImg : settingsImg;
    let leftImg = this.state.menuBlockOn ? closeImg : menuImg;
    return (
      <div>
        <div className='img-wrap'>
          <img src={homaImg} alt='logo' />
        </div>
        <div className='menu'>
          <a href='#' className='menu-button'>
            <img src={leftImg} alt='menu' onClick={this.toggleMenuBlock.bind(this)} />
          </a>
          <a href='#' className='menu-button setting-button'>
            <img src={rightImg} alt='set' onClick={this.toggleSettings.bind(this)} />
          </a>
        </div>
      </div>
    );
  }
}

