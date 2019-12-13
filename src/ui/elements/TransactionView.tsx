import {Transaction} from "@coinbarn/ergo-ts";
import {unitsInOneErgo} from "@coinbarn/ergo-ts/dist/constants";
import React from 'react';
import Constants from "../../Constants";

interface ITransactionViewProps {
  address: string
  tx: Transaction
  confirmed: boolean
}

export default class TransactionView extends React.Component<ITransactionViewProps> {
  public txToProps(tx: Transaction) {
    const spent = tx.inputs.filter(i => i.address === this.props.address).reduce((sum, { value }) => sum + (value || 0), 0);
    const received = tx.outputs.filter(o => o.address.address === this.props.address).reduce((sum, { value }) => sum + value, 0);
    const delta = received - spent;
    // TODO: tokens after the explorer update
    const date = new Date();
    if (tx.timestamp) {
      date.setTime(tx.timestamp);
    }

    return {
      action: delta > 0 ? 'Received ERGS' : 'Sent ERGS',
      amountStr: (delta / unitsInOneErgo).toString().concat(' ERGS'),
      date: date.toLocaleDateString('en-US').concat(' at ').concat(date.toLocaleTimeString('en-US')),
      explorerHref: `${Constants.explorerURL}/en/transactions/${tx.id}`
    }
  };

  public render(){

    const txProps = this.txToProps(this.props.tx);

    return(
        <div className={'transactionDiv '.concat(this.props.confirmed ?  'txConfirmed' : 'txUnconfirmed')}>
          <div className='txColumnsDiv'>
            <div className='txLeftDiv'>
              <div className='txDate'>
                {txProps.date}
              </div>
              <div className='txType f2'>
                {txProps.action}
              </div>
            </div>
            <div className='txRightDiv'>
              <div className='txDetails'>
              <a target="_blank" rel="noopener noreferrer" href={txProps.explorerHref}> Details </a>
              </div>
              <div className='txAmount f2'>
              {txProps.amountStr}
              </div>
            </div>
          </div>
        </div>
    );
  }
}
