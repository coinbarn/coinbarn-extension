import React from 'react';
import barn from "../../img/Barn_1@4x.png";

interface StartProps {
  updateState: (s: any) => void
}

export default class StartScreen extends React.Component<StartProps, {}> {

  render() {
    return (
      <div className="container">
        <div className="screen screen-7">
          <div className="img-wrap">
            <img className="homa-screen-1" src={barn} alt="homa"/>

          </div>
          <h2 className="note">Welcome to<br/> the Barn!</h2>


          <div className="buttons">
            <a className="button green-button" href="#">Start</a>
          </div>
        </div>
      </div>
    );
  }
}

