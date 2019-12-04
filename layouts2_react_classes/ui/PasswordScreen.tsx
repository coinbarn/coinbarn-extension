import React from 'react';
import avaImg from '../img/avatar.svg';

export default class PasswordScreen extends React.Component {
  render() {
    return (
      <div className='registerScreen'>
        <div className='imgWrap'>
          <img src={avaImg} />
        </div>
        <h1 id='accountName'> V1sionary </h1>
        <div id='requestDiv' className='ffn'> Password </div>
        <input type='password'/>
        <button className='largeBtn'>Continue</button>
        <div className='emptyDiv'></div>
        <button className='backBtn'>Back</button>
      </div>
    );
  }
}

