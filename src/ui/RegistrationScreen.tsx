import React from 'react';
import regImg from '../img/homa_register.svg';
import InputBlockF from "./elements/InputBlockF";
import zxcvbn from 'zxcvbn';
import PublicAccount from "../PublicAccount";

interface RegProps {
  updateState: (a: any) => void
  registeredAccounts: string[]
}

interface RegState {
  checkbox: boolean
  formValid: boolean
}

export default class RegistrationScreen extends React.Component<RegProps, RegState> {

  accNameElement: any;
  passElement: any;
  pass2Element: any;

  constructor(props) {
    super(props);
    this.state = {
      checkbox: false,
      formValid: false
    };
    this.accNameElement = React.createRef();
    this.passElement = React.createRef();
    this.pass2Element = React.createRef();
  }


  validateAccName = accName => {
    if (accName.length < 3) {
      return 'Account name is too short';
    } else if (this.props.registeredAccounts.includes(accName)) {
      return 'Account already registered';
    } else {
      return '';
    }
  };

  validatePass = pass => {
    const strength = zxcvbn(pass);
    // todo strength.score < 4 for production
    // todo change validity of pass2 ?
    if (strength.score < 1) {
      return 'Password is too weak'
    } else {
      return ''
    }
  };

  validatePass2 = pass2 => {
    const pass = this.passElement.current.state.value;
    if (pass !== pass2) {
      return 'Passwords do not match'
    } else {
      return ''
    }
  };

  onUpdate = () => {
    const accIsValid = this.accNameElement.current.state.isValid;
    const passIsValid = this.passElement.current.state.isValid;
    const passRepeatIsValid = this.pass2Element.current.state.isValid;

    if (accIsValid && passIsValid && passRepeatIsValid && this.state.checkbox) {
      this.setState({formValid: true})
    } else if (this.state.formValid) {
      this.setState({formValid: false})
    }
  };

  clickCheckbox(e) {
    const value = e.target.checked;
    this.setState({checkbox: value}, this.onUpdate);
  }

  submit = () => {
    const newState = {
      account: new PublicAccount(this.accNameElement.current.state.value, ''),
      screen: 'seed',
      screenData: this.passElement.current.state.value,
    };
    this.props.updateState(newState);
  };

  render() {
    return (
      <div className='registerScreen'>
        <div className='imgWrap'>
          <img src={regImg}/>
        </div>
        <InputBlockF ref={this.accNameElement}
                     name='Create an account name'
                     validate={this.validateAccName}
                     onUpdate={this.onUpdate}/>
        <InputBlockF name='Create a password'
                     isPassword={true}
                     ref={this.passElement}
                     validate={this.validatePass}
                     onUpdate={this.onUpdate}/>
        <InputBlockF name='Confirm password'
                     isPassword={true}
                     ref={this.pass2Element}
                     validate={this.validatePass2}
                     onUpdate={this.onUpdate}/>
        <div className='checkboxDiv'>
          <input type='checkbox' id='checkbox' onChange={this.clickCheckbox.bind(this)}/>
          <label htmlFor='checkbox'>
            I have read and agree <br/>to the <a href='#'>Terms of Use</a>
          </label>
        </div>
        <div className='registrationControls'>
          <button disabled={!this.state.formValid} className='largeBtn' onClick={this.submit}>Continue</button>
          <button className='backBtn' onClick={() => this.props.updateState({screen: 'welcome'})}>Back</button>
        </div>
      </div>
    );
  }
}
