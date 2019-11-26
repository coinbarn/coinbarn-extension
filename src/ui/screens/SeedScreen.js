import React from 'react';
import logo from '../../img/2screen/logo.jpg';
import back from '../../img/ui/back.png';
import refresh from '../../img/ui/refresh.png';
import copy from '../../img/ui/copy.png';

export default class SeedScreen extends React.Component {
  render() {
    return (
        <div className="container">
          <div className="screen screen-5">
            <div className="img-wrap">
              <img src={logo} alt="" className="logo" />
            </div>


            <form action="#">

              <h4 className="subtitle">
                Secret Backup Phrase
              </h4>

              <p>
                Be sure to save <span className="green-note">Secret Backup Phrase.</span><br /> You can copy or write it
                on a
                piece of paper. Keep it in a safe place.

              </p>

              <div className="buttons-area">
                <a href="#" className="refresh"><img src={refresh} alt="refresh" /></a>
                <a href="#" className="copy"><img src={copy} alt="copy" /></a>
              </div>

              <textarea name="phrase" id="phrase" className="text-phrase"></textarea>

              <strong>Your address:</strong>
              <button className="link">Dx39FuAa6VniKwPvPq7gRJYTyKLXULX14Na1yPTMdHVj</button>

              <div className="buttons">
                <input type="submit" value="Continue" className="button green-button continue" />
                  <a href="#" className="back"><img src={back} alt="back" />Back</a>
              </div>

            </form>

          </div>
        </div>

  );
  }
}

