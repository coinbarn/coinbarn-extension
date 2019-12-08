import React from 'react';


export default class Overlay extends React.Component {

  public render() {
    return (
      <div className='overlay'>
        <div className='popup'>
          <button className='closeBtnSmall'></button>
          <div className='greeting'>Congrats!</div>
          <p>You have successfully issued 100 ERGS tokens</p>
          <p>Check out your balance</p>
        </div>
      </div>
    );
  }
}
