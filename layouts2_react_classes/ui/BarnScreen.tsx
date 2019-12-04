import React from 'react';
import barnImg from '../img/barn.svg';

export default class BarnScreen extends React.Component {
  render() {
    return (
      <div className='registerScreen'>
        <div className='imgWrapBarn'>
          <img src={barnImg} />
        </div>
        <div className='greeting'>
          Welcome to the Barn!
        </div>
        <div className='registrationControls'>
          <button className='largeBtn'>Start</button>
          <button className='backBtn' disabled={true}>Back</button>
        </div>
      </div>
    );
  }
}

