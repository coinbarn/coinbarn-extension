import React from 'react';
import Transaction from './Transaction';

interface TransactionsTabProps{
}

// Arrays of transactions go here
interface TransactionsTabState{
  unconfirmed: Array<object>,
  confirmed: Array<object>
}

// TODO: tune the function for convenient tx format
const txToProps = (tx) => {
  return {
    amountStr: tx.value.toString().concat(' ERGS'),
    action: tx.value > 0 ? 'Received ERGS' : 'Sent ERGS',
    date: tx.date.toLocaleDateString('en-US').concat(' at ').concat(tx.date.toLocaleTimeString('en-US')),
    explorerHref: '#'
  }
};

export default class TransactionsTab extends React.Component<TransactionsTabProps, TransactionsTabState> {
  constructor(props){
    super(props);
    this.state = {
      confirmed: [
        {
          value: 0.123,
          date: new Date(Date())
        },
        {
          value: -0.123,
          date: new Date(Date())
        },
        {
          value: -0.123,
          date: new Date(Date())
        }
      ],
      unconfirmed: [
        {
          value: 0.456,
          date: new Date(Date())
        },
        {
          value: -0.789,
          date: new Date(Date())
        }
      ]
    };
  }

  render(){
    const confirmedList = this.state.confirmed.map(tx => (<Transaction confirmed={true} {...txToProps(tx)} />));
    const unconfirmedList = this.state.unconfirmed.map(tx => <Transaction confirmed={false} {...txToProps(tx)} />)
    return(
      <div className='transactionsTab'>
        <div className='transactionsListDiv'>
          <div className='transactionsListTop'>
          </div>
          {unconfirmedList.length > 0 ?  <h3> Queue ({unconfirmedList.length}) </h3> : ''}
          {unconfirmedList}
          <h3> History </h3>
          {confirmedList.length > 0 ? '' : <div className='dummyTransactionDiv'>You have no transactions</div>}
          {confirmedList}
        </div>
      </div>
    );
  }
}
