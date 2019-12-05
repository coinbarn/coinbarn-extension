import React from 'react';
import avaSmallImg from '../../img/avatar_small.svg'
import Dropdown from'./Dropdown'

export default class InfoProfile extends React.Component {
  render(){
    return(
      <div className='profileInfo'>
        <div className='avatarDiv'>
          <img src={avaSmallImg}/>
        </div>
        <div className='accountDiv'>
          <span className='nameInUseSpan'>Name is already in use</span>
          <div className='accountNameDiv'>
            <input className='addressInputSmall f2' value='V1sionary' />
            <button className='editBtn'> </button>
          </div>
          <button className='smallAddressBtn'>
            9fMBpufpMEEr2GoHbmPTHAfd6j3Ew1QbcxWjr7LobQKzChETLYW
          </button>
          <span className='copiedSpan'>Copied</span>
        </div>
        <div className='spacerDiv'>
        </div>
        <div className='balanceDiv'>
          <div className='balanceText ffn'>
            Account balance:
          </div>
          <Dropdown list={['111 ERGS','112 ERGS','113 ERGS', '0.114 ERGS']} />
        </div>
      </div>
    );
  }
}
