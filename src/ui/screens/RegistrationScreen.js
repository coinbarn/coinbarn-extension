import React from 'react';
import logo from '../../img/2screen/logo.jpg';
import back from '../../img/ui/back.png';
import back_dark from '../../img/ui/back_dark.png';

export default class RegistrationScreen extends React.Component {
  render() {
    return (
        <div className="container">
          <div className="screen screen-2">
            <div className="img-wrap">
              <img src={logo} alt="" className="logo" />
            </div>


            <form action="#">
              <div className="field">
                <strong>Create an account name</strong>
                <input type="text" id="AccName" required />

              </div>
              <div className="field">
                <strong>Create a password</strong>
                <input type="password" id="pass" className="valid" />

              </div>
              <div className="field">
                <strong>Confirm password</strong>
                <input type="password" id="confPass" className="wrong" />
                  <p className="error">Passwords don’t match</p>

              </div>

              <div className="agree">
                <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox">
                    I have read and agree<br/> to the <a href="#">Terms of Use</a>
                  </label>
              </div>


              <div className="buttons">
                <input type="submit" disabled value="Continue" className="button green-button continue" />
                  <a href="#" className="back"><img src={back} alt="" /><img src={back_dark} alt="" />Back</a>
              </div>

            </form>

          </div>
        </div>


  );
  }
}

