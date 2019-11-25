import React from 'react';
import homaImg from './img/1screen/homa3.png';

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <div class="screen screen-1 welcome">
        <div class="img-wrap">
          <img src={homaImg} alt="homa" />
        </div>
        <h2 class="note">Welcome back!</h2>


        <form action="#">
          <div class="select-name">
            <select name="autorization" id="">
              <option value="name-1">Miki</option>
              <option value="name-2">V1sionary</option>
              <option value="name-3">Mouse</option>
            </select>
          </div>

          <div class="buttons">
            <input class="button green-button " type='submit' value="Continue" />
          </div>
        </form>

        <div class="account-links">
          <p>
            <a href="#">Create New Account</a>
          </p>
          <p>
            <a href="#">Import Account</a>
          </p>

        </div>
      </div>
    );
  }
}

