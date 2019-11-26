import zxcvbn from 'zxcvbn';
import React from 'react';
import logo from '../../img/2screen/logo.jpg';
import back from '../../img/ui/back.png';
import back_dark from '../../img/ui/back_dark.png';

export default class RegistrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AccName: '',
      pass: '',
      confPass: '',
      formErrors: {AccName: 'Account name is too short', pass: 'Passwords is too weak', confPass: '', checkbox: ''},
      formValid: false
    }
  }

  handleUserInput(e) {
    const name = e.target.id;
    let value = '';
    if (name !== 'checkbox') {
      value = e.target.value;
    } else {
      value = e.target.checked;
    }
    console.log(`${name} -> ${value} | ${e.target.checked}`);
    this.setState({[name]: value},
        () => {
          this.validateField(name, value)
        });
  }

  validateField(name, value) {
    let fieldValidationErrors = this.state.formErrors;

    if (name === 'pass') {
      const strength = zxcvbn(value);
      if (strength.score < 3) {
        fieldValidationErrors.pass = 'Passwords is too weak';
      } else {
        fieldValidationErrors.pass = ``;
      }
    } else if (name === 'checkbox') {
      if (!value) {
        fieldValidationErrors.checkbox = 'Please read and agree with terms of use';
      } else {
        fieldValidationErrors.checkbox = '';
      }
    } else if (name === 'AccName') {
      if (value.length < 3) {
        fieldValidationErrors.AccName = 'Account name is too short';
      } else {
        fieldValidationErrors.AccName = '';
      }
    }
    if (name === 'confPass' || name === 'pass') {
      if (this.state.pass !== this.state.confPass) {
        fieldValidationErrors.confPass = 'Passwords do not match';
      } else {
        fieldValidationErrors.confPass = '';
      }
    }

    this.setState({formErrors: fieldValidationErrors}, this.validateForm);
  }

  validateForm() {
    let valid = this.state.checkbox &&
        Object.values(this.state.formErrors).every((e, i, a) => e === '');
    this.setState({formValid: valid});
  }

  errorClass(name) {
    return this.state.formErrors[name] === '' ? "valid" : "wrong";
  }

  render() {
    return (
        <div className="container">
          <div className="screen screen-2">
            <div className="img-wrap">
              <img src={logo} alt="" className="logo"/>
            </div>


            <form action="#">
              <div className="field">
                <strong>Create an account name</strong>
                <input type="text" id="AccName" className={this.errorClass('AccName')}
                       value={this.state.AccName} onChange={this.handleUserInput.bind(this)}/>
                <p className="error">{this.state.formErrors['AccName']}</p>

              </div>
              <div className="field">
                <strong>Create a password</strong>
                <input type="password" id="pass" className={this.errorClass('pass')} value={this.state.pass}
                       onChange={this.handleUserInput.bind(this)}/>
                <p className="error">{this.state.formErrors['pass']}</p>

              </div>
              <div className="field">
                <strong>Confirm password</strong>
                <input type="password" id="confPass" className={this.errorClass('confPass')} value={this.state.confPass}
                       onChange={this.handleUserInput.bind(this)}/>
                <p className="error">{this.state.formErrors['confPass']}</p>

              </div>

              <div className="agree">
                <input type="checkbox" id="checkbox" onChange={this.handleUserInput.bind(this)}/>
                <label htmlFor="checkbox">
                  I have read and agree<br/> to the <a href="#">Terms of Use</a>
                </label>
              </div>

              <div className="buttons">
                <input type="submit" disabled={!this.state.formValid} value="Continue"
                       className="button green-button continue"/>
                <a href="#" className="back"><img src={back} alt=""/><img src={back_dark} alt=""/>Back</a>
              </div>
            </form>
          </div>
        </div>


    );
  }
}

