import React from 'react';
import Account from "../../Account";
import TransactionView from './TransactionView';

interface ITransactionsTabProps {
  account: Account
}

export default class TransactionsTab extends React.Component<ITransactionsTabProps, {}> {

  public interval: any;

  public render() {
    const acc = this.props.account;
    const confirmed = this.props.account.accountData.confirmedTxs;
    const unconfirmed = this.props.account.accountData.unconfirmedTxs;

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
