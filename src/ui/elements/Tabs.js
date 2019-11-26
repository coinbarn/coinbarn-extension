import React from 'react';
import TransactionsTab from './TransactionsTab';
import IssueTab from './IssueTab';
import SendTab from './SendTab';

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
    this.tabs = [<SendTab/>, <TransactionsTab/>, <IssueTab/>];
  }
  render() {
    return (
      <div className="wrap-main">
        <div className="tabs">
          <div className="tab-send tab-link">
            <input type="radio" name="tab" checked id="tab-send"/>
            <label htmlFor="tab-send">Send</label>
            {this.tabs[0]}
          </div>
          <div className="tab-transaction tab-link">
            <input type="radio" name="tab" checked id="tab-transaction"/>
            <label htmlFor="tab-transaction">Transactions</label>
            {this.tabs[1]}
          </div>
          <div className="tab-issue tab-link">
            <input type="radio" name="tab" checked id="tab-issue"/>
            <label htmlFor="tab-issue">Issue</label>
            {this.tabs[2]}
          </div>
        </div>
      </div>
    );
  }
}

