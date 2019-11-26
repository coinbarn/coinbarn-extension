import React from 'react';
import Dropdown from './Dropdown';

export default class SendTab extends React.Component {
  render() {
    return (
      <div className="more-info-send more-info">
        <form action="#">
          <label htmlFor="" className="select-field">
            <span>You send:</span>
            <Dropdown list={['ERGS','Token','Tiken']} />
          </label>

          <label htmlFor="">
            <strong>Adress</strong>
            <input type="text"/>
          </label>
          <label htmlFor="" className='amount'>
            <strong>Amount</strong>
            <input type="text"/>
            <a href="#" className="max-button">MAX</a>
          </label>
          <p>
            <input type="submit" value="Send" disabled/>
          </p>
        </form>
      </div>
    );
  }
}

