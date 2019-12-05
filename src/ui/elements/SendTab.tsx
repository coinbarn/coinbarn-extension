import React from 'react';
import Dropdown from './Dropdown';
import InputBlock from './InputBlock';
import InputBlockMax from './InputBlockMax';

export default class SendTab extends React.Component {
  render(){
    return(
      <div className='sendTab'>
        <div className='currencyDiv f2'>
          You send:
          <Dropdown list={['ERGS', 'Token', 'Tiken']} />
        </div>
        <InputBlock large={true} valid={undefined} name='Address' error='Invalid address' />
        <InputBlockMax large={true} valid={undefined} name='Address' error='Invalid address' />
        <button className='mediumBtn'>Send</button>
      </div>
    );
  }
}
