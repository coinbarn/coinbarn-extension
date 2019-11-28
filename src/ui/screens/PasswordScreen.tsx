import React from 'react';
import back from "../../img/ui/back.png";
import homa3 from "../../img/1screen/homa3.png";
import PublicAccount from "../../PublicAccount";

interface PasswordProps {
  account: PublicAccount
  setAccState: (x: PublicAccount) => void
}

interface PasswordState {
  account: PublicAccount

}

export default class PasswordScreen extends React.Component<PasswordProps, PasswordState> {
  constructor(props: PasswordState) {
    super(props);
    this.state = {
      account: props.account
    };
  }


  render() {
    return (
      <div className="container">
        <div className="screen screen-1 welcome">
          <div className="img-wrap">
            <img className="homa-screen-1" src={homa3} alt="homa"/>
          </div>
          <h2 className="enter-name">{this.state.account.name}</h2>

          <div className="enter-pass">
            <form action="#">
              <label htmlFor="">
                <strong>
                  Password
                </strong>
                <input type="password"/>
              </label>

              <div className="buttons">
                <input className="button green-button" href="#" type="submit" value="Continue"/>
              </div>
            </form>
          </div>
          <div className="account-links">
            <p>
              <a href="#"><img src={back} alt=""/>Back</a>
            </p>
          </div>

        </div>
      </div>

    );
  }
}

