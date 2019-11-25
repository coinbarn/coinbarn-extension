import React from 'react';

export default class SendTab extends React.Component {
  render() {
    return (
        <div className="tab-send tab-link">
          <input type="radio" name="tab" checked id="tab-send"/>
          <label htmlFor="tab-send">Send</label>
          <div className="more-info-send more-info">
            <form action="#">
              <label htmlFor="" className="select-field">
                <span>You send:</span>
                <select name="select2" id="">
                  <option value="val-1">ERGS</option>
                  <option value="val-2">Token</option>
                  <option value="val-3">Tiken</option>
                </select>
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
        </div>
    );
  }
}

