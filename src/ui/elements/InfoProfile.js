import React from 'react';
import avatar from '../../img/14screen/avatar.png';
import edit from '../../img/ui/edit.png';
import Dropdown from'./Dropdown';

class AddressBar extends React.Component {
  copyToClipboard(){
    navigator.clipboard.writeText(this.props.address);
  }

  render() {
    return(
      <a href="#" className="link-info" onClick={this.copyToClipboard.bind(this)}>{this.props.address}</a>
    );
  }
}

export default class InfoProfile extends React.Component {
  render() {
    return(
      <div className="info-profile">
        <div className="left-part">
          <div className="img-wrap-ava">
            <a href="#" className="avatar">
              <img src={avatar} alt=""/>
            </a>
          </div>
          <div className="text-wrap">
            <h5 className="profile-name">{this.props.name}
              <a href="#" className="edit-profile-name">
                <img src={edit} alt=""/>
              </a>
            </h5>
            <AddressBar address={this.props.address}/>
            <span className="link-copied">Copied</span>
          </div>
        </div>
        <div className="right-part">
          <h5>Account balance: </h5>
          <Dropdown list={['0.111 ERGS','0.112 ERGS','0.113 ERGS']} />
        </div>
      </div>
    );
  }
}
