import React from 'react';
import avatar from '../../img/14screen/avatar.png';
import edit from '../../img/ui/edit.png';

class AddressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Dx39FuAa6VniKwPvPq7gRJYTyKLXULX14Na1yPTMdHVj'
    }
  }

  copyToClipboard(){
    navigator.clipboard.writeText(this.state.value);
  }

  render() {
    return(
      <a href="#" className="link-info" onClick={this.copyToClipboard.bind(this)}>{this.state.value}</a>
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
            <h5 className="profile-name">V1sionary
              <a href="#" className="edit-profile-name">
                <img src={edit} alt=""/>
              </a>
            </h5>
            <AddressBar />
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
    );
  }
}
