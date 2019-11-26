import React from 'react';
import homaImg from '../../img/1screen/homa3.png';
import CoinbarnStorage from "../../CoinbarnStorage";

export default class WelcomeScreen extends React.Component {

  accountItems() {
    let items = [];
    console.log(CoinbarnStorage.getAccountNames());
    for (let acc of CoinbarnStorage.getAccountNames()) {
      items.push(<option key={acc} value={acc}>{acc}</option>);

      {/*<option value="name-1">Miki</option>*/}
      {/*<option value="name-2">V1sionary</option>*/}
      {/*<option value="name-3">Mouse</option>*/}
    }
    return items;
  }

  render() {
    return (
        <div className="container">

          <div className="screen screen-1 welcome">
            <div className="img-wrap">
              <img src={homaImg} alt="homa"/>
            </div>
            <h2 className="note">Welcome back!</h2>


            <form action="#">
              {/*<div class="select-name">*/}
                <select name="autorization" id="">
                  {this.accountItems()}
                </select>
              {/*</div>*/}

              <div className="buttons">
                <input className="button green-button " type='submit' value="Continue"/>
              </div>
            </form>

            <div className="account-links">
              <p>
                <a href="#">Create New Account</a>
              </p>
              <p>
                <a href="#">Import Account</a>
              </p>

            </div>
          </div>
        </div>
    );
  }
}

