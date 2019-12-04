import React from 'react';
import regImg from '../img/homa_register.svg';
import InputBlock from './elements/InputBlock';

export default class RegistrationScreen extends React.Component {
  render() {
    return (
      <div className='registerScreen'>
        <div className='imgWrap'>
          <img src={regImg} />
        </div>
        <InputBlock valid={undefined} name='Create an account name' error='Name already exists' />
        <InputBlock valid={false} isPassword={true} name='Create a password' error='Password is too weak' />
        <InputBlock valid={true} isPassword={true} name='Confirm password' error='Passwords dont match' />
        <div className='checkboxDiv'>
          <input type='checkbox' id='checkbox'/> 
          <label htmlFor='checkbox'> 
            I have read and agree <br/>to the <a href='#'>Terms of Use</a>
          </label>
        </div>
        <div className='registrationControls'>
          <button className='largeBtn'>Continue</button>
          <button className='backBtn'>Back</button>
        </div>
      </div>
    );
  }
}
