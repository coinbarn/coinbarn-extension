import {Transaction} from "@coinbarn/ergo-ts";
import React from 'react';
import Account from "../../Account";
import TransactionView from './TransactionView';

interface ITransactionsTabProps {
  account: Account
}

interface ITransactionsTabState {
  confirmed: Transaction[]
  unconfirmed: Transaction[]
}

export default class TransactionsTab extends React.Component<ITransactionsTabProps, ITransactionsTabState> {

  public interval: any;

  constructor(props) {
    super(props);
    this.state = {
      confirmed: this.props.account.accountData.confirmedTxs,
      unconfirmed: this.props.account.accountData.unconfirmedTxs
    };
  }


  public refresh() {
    this.props.account.accountData.refreshUnconfirmed().then(
      e => {
        this.setState({unconfirmed: this.props.account.accountData.unconfirmedTxs});
      }
    )
  }

  public componentDidMount() {
    this.refresh();
    this.interval = setInterval(() => this.refresh(), 10000);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {
    const acc = this.props.account;
    const confirmed = this.state.confirmed;
    const unconfirmed = this.state.unconfirmed;

    const confirmedList = confirmed.map(tx => (<TransactionView key={tx.id} account={acc} confirmed={true} tx={tx}/>));
    const unconfirmedList = unconfirmed.map(tx => (
      <TransactionView key={tx.id} account={acc} confirmed={false} tx={tx}/>));
    return (
      <div className='transactionsTab'>
        <div className='transactionsListDiv'>
          <div className='transactionsListTop'>
          </div>
          {unconfirmedList.length > 0 ? <h3> Queue ({unconfirmedList.length}) </h3> : ''}
          {unconfirmedList}
          <h3> History </h3>
          {confirmedList.length > 0 ? '' : <div className='dummyTransactionDiv'>You have no transactions</div>}
          {confirmedList}
        </div>
      </div>
    );
  }
}
