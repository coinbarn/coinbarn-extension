import React from 'react';
import barnImg from '../img/barn.svg';

interface IBarnProps {
  updateState: (a: any) => void
}

export default class BarnScreen extends React.Component<IBarnProps, {}> {
  public render() {
    return (
      <div className='registerScreen'>
        <div className='imgWrapBarn'>
          <img src={barnImg} alt='Barn of the Homa'/>
        </div>
        <div className='greeting'>
          Welcome to the Barn!
        </div>
        <div className='registrationControls'>
          <button className='largeBtn' onClick={() => this.props.updateState({screen: 'home'})}>Start</button>
          <button className='backBtn' disabled={true}>Back</button>
        </div>
      </div>
    );
  }
}

