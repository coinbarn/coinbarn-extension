import React from 'react';
import zxcvbn from 'zxcvbn';
import Account from "../Account";
import Constants from "../Constants";
import regImg from '../img/homa_register.svg';
import EyedInputBlock from "./elements/EyedInputBlock";
import InputBlock from "./elements/InputBlock";

interface IRegProps {
  updateState: (a: any) => void
  registeredAccounts: string[]
}

interface IRegState {
  checkbox: boolean
  formValid: boolean
}

export default class RegistrationScreen extends React.Component<IRegProps, IRegState> {

  public accNameElement: any;
  public passElement: any;
  public pass2Element: any;

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


  public validateAccName = accName => {
    if (accName.length < 3) {
      return 'Account name is too short';
    } else if (this.props.registeredAccounts.includes(accName)) {
      return 'Account already registered';
    } else {
      return '';
    }
  };

  public validatePass = pass => {
    const strength = zxcvbn(pass);
    let errorMsg: string = '';
    if (strength.score < 1) {
      errorMsg = 'Password is too weak';
    } else if (strength.score < 3) {
      errorMsg = 'Insecure password';
    }
    const pass2Value = this.pass2Element.current.state.value;
    const passComparison = this.comparePasswords(pass, pass2Value);
    this.pass2Element.current.updateValidity(passComparison, pass2Value);
    return {score: strength.score, error: errorMsg};
  };

  public validatePass2 = pass2 => {
    return this.comparePasswords(this.passElement.current.state.value, pass2);
  };

  public comparePasswords(pass1, pass2) {
    if (pass1 !== pass2) {
      return {score: 0, error: 'Passwords do not match'};
    } else {
      return {score: 5, error: ''};
    }
  }

  public onUpdate = () => {
    const accIsValid = this.accNameElement.current.state.isValid;
    const passIsValid = this.passElement.current.state.isValid;
    const passRepeatIsValid = this.pass2Element.current.state.isValid;

    const formValid = accIsValid && passIsValid && passRepeatIsValid && this.state.checkbox;

    if (this.state.formValid !== formValid) {
      this.setState({formValid: formValid})
    }
  };

  public clickCheckbox(e) {
    const value = e.target.checked;
    this.setState({checkbox: value}, this.onUpdate);
  }

  public submit = () => {
    const newState = {
      account: new Account(this.accNameElement.current.state.value, ''),
      screen: 'seed',
      regPassword: this.passElement.current.state.value,
    };
    this.props.updateState(newState);
  };

  public render() {
    return (
      <div className='registerScreen'>
        <div className='imgWrap'>
          <img src={regImg} alt='Homa'/>
        </div>
        <InputBlock ref={this.accNameElement}
                    name='Create an account name'
                    validate={this.validateAccName}
                    onUpdate={this.onUpdate}/>
        <EyedInputBlock name='Create a password'
                        type='password'
                        ref={this.passElement}
                        validate={this.validatePass}
                        onUpdate={this.onUpdate}/>
        <EyedInputBlock name='Confirm password'
                        type='password'
                        ref={this.pass2Element}
                        validate={this.validatePass2}
                        onUpdate={this.onUpdate}/>
        <div className='checkboxDiv'>
          <input type='checkbox' id='agreeCheckbox' onChange={this.clickCheckbox.bind(this)}/>
          <label htmlFor='agreeCheckbox'>
            I have read and agree <br/>to the <a target="_blank" rel="noopener noreferrer" href={Constants.termsURL}>Terms of Use</a>
          </label>
        </div>
        <div className='checkboxDiv'>
          <input type='checkbox' id='minerCheckbox'/>
          <label htmlFor='minerCheckbox'>
            Miner address
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
