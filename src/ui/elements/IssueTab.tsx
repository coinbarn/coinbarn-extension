import React from 'react';
import InputBlock from './InputBlock'

export default class IssueTab extends React.Component {
  render(){
    return(
      <div className='issueTab'>
        <h3> Create your token on ERGO Platform </h3>
        <InputBlock large={true} valid={undefined} name='Asset name' error='Invalid name' />
        <InputBlock large={true} valid={undefined} name='Net amount' error='Invalid amount' />
        <InputBlock large={true} valid={undefined} name='Decimal places' error='Invalid number of decimal places' />
        <div className='inputLabel ffn'>Brief description</div>
        <textarea> </textarea>
        <button className='mediumBtn' disabled>Issue</button>
      </div>
    );
  }
}
