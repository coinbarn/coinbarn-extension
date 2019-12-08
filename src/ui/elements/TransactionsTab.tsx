import React from 'react';
import TransactionView from './TransactionView';
import Account from "../../Account";

interface ITransactionsTabProps {
  account: Account
}

export default class TransactionsTab extends React.Component<ITransactionsTabProps, {}> {

  public render() {
    const address = this.props.account.address;
    const confirmed = this.props.account.confirmedTxs;
    const unconfirmed = this.props.account.unconfirmedTxs;

    const confirmedList = confirmed.map(tx => (<TransactionView key={tx.id} address={address} confirmed={true} tx={tx}/>));
    const unconfirmedList = unconfirmed.map(tx => (<TransactionView key={tx.id} address={address} confirmed={false} tx={tx}/>));
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
