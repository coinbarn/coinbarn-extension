import React from 'react';
import homaImg from '../img/homa_register.svg';

export default class SeedScreen0 extends React.Component {
  render() {
    return (
      <div className='registerScreen'>
        <div className='imgWrap'>
          <img src={homaImg} />
        </div>

        <h1>Secret Backup Phrase</h1>

        <div id='descriptionDiv'>
          Be sure to save <strong>Secret Backup Phrase</strong>. <br />
          You can copy or write it on a piece of paper. <br />
          Keep it in a safe place.
        </div>

        <div id='textButtons'>
          <button className='refreshSeedBtn'></button>
          <button className='copySeedBtn'></button>
        </div>
        <textarea className='ffn'> </textarea>

        <div className='addressParams'>
          <strong>Your address:</strong>
          <button className='fullAddressBtn'>
            9fMBpufpMEEr2GoHbmPTHAfd6j3Ew1QbcxWjr7LobQKzChETLYW
          </button>
        </div>

        <div className='registrationControls'>
          <button className='largeBtn'>Continue</button>
          <button className='backBtn'>Back</button>
        </div>

      </div>
    );
  }
}

