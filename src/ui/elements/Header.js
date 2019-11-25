import React from 'react';
import homaImg from '../../img/14screen/homa.jpg';
import menuImg from '../../img/ui/menu_icon.png';
import closeImg from '../../img/ui/close_menu.png';
import settingsImg from '../../img/ui/settings_icon.png';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <div class='img-wrap'>
          <img src={homaImg} alt='logo' />
        </div>
        <div class='menu'>
          <a href='#' class='menu-button'>
            <img src={menuImg} alt='menu' />
            <img src={closeImg} alt='menu-active' />
          </a>
          <a href='#' class='menu-button setting-button'>
            <img src={settingsImg} alt='set' onClick={this.props.toggleSettings} />
            <img src={closeImg} alt='menu-active' />
          </a>
        </div>
      </div>
    );
  }
}

