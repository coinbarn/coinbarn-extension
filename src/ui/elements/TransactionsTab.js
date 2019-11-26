import React from 'react';

export default class TransactionsTab extends React.Component {
  render() {
    return (
      <div className="tab-transaction tab-link">
        <div className="more-info-transaction more-info">
          <div className="transaction-block">
            <h5 className="tab-title"></h5>
            <p className="bage">History:</p>
            <div className="wrap-process">
              <div className="status">
                <p className="process-bage date-bage">
                  #1 11/01/2019 at 16:09
                </p>
                <div className="process-send">
                  Sent ERGS
                </div>
                <span className="info-popup-conf">
                  Confirmed
                </span>
              </div>
              <div className="details">
                <p className="process-bage">
                  Details
                </p>
                <div className="process-send process-send-details">
                  -0.111 ERGS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

