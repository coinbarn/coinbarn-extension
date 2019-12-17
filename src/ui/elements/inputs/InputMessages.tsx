import React from 'react';

const InputMessages = (props) => {
    return (
      <div className='inputMessagesDiv'>
        <div className='inputMessageLeft'>{props.msg}</div>
        <div className='errorDiv'>{props.errorMsg ? props.errorMsg : '\xa0'}</div>
      </div>
    );
}

export default InputMessages;
