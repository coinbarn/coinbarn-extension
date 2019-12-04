import React from 'react';

interface TransactionProps {
  confirmed: boolean,
  amountStr: string,
  action: string,
  date: string,
  explorerHref: string
}

export default class Transaction extends React.Component<TransactionProps> {
  render(){
    return(
        <div className={'transactionDiv '.concat(this.props.confirmed ?  'txConfirmed' : 'txUnconfirmed')}>
          <div className='txColumnsDiv'>
            <div className='txLeftDiv'>
              <div className='txDate'>
                {this.props.date}
              </div>
              <div className='txType f2'>
                {this.props.action}
              </div>
            </div>
            <div className='txRightDiv'>
              <div className='txDetails'>
              <a href={this.props.explorerHref}> Details </a>
              </div>
              <div className='txAmount f2'>
              {this.props.amountStr}
              </div>
            </div>
          </div>
        </div>
    );
  }
}
