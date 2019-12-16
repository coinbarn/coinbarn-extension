import {ErgoBox, feeValue, Transaction} from "@coinbarn/ergo-ts";
import {unitsInOneErgo} from "@coinbarn/ergo-ts/dist/constants";
import React from 'react';
import Account from "../../Account";
import Constants from "../../Constants";

interface ITransactionViewProps {
  account: Account
  tx: Transaction
  confirmed: boolean
}

interface ITxProps {
  action: string
  amountStr: string
  fee: string
  date: string
  explorerHref: string
}


export default class TransactionView extends React.Component<ITransactionViewProps> {
  public txToProps(tx: Transaction): ITxProps {
    const date = new Date();
    if (tx.timestamp) {
      date.setTime(tx.timestamp);
    }
    const myInputs = tx.inputs.filter(i => this.props.account.isMine(i));
    const myOutputs = tx.outputs.filter(i => this.props.account.isMine(i));
    let action: string;
    let amountStr: string;
    let fee: string;
    const tokensReceived = this.props.account.boxesToBalances(myOutputs, false);
    if (myInputs.length === 0) {
      fee = '';
      // incoming transaction
      const ergsReceived = myOutputs.reduce((sum, {value}) => sum + value, 0);
      if (ergsReceived > feeValue || tokensReceived.length === 0) {
        // ERG transfer transaction
        action = 'Received ERG';
        amountStr = (ergsReceived / unitsInOneErgo).toString().concat(' ERG');
      } else {
        // Custom token transfer transaction - extract the first one
        const token = tokensReceived[0];
        action = `Received ${token.name}`;
        amountStr = `${token.amount} ${token.name}`;
      }
    } else {
      // outcoming transaction
      const issuedToken = tokensReceived.find(tr => tx.inputs.find(inp => inp.boxId === tr.tokenId) !== undefined);
      fee = '0.001 ERG';
      if (issuedToken !== undefined) {
        // Token issue transaction
        action = `Issued ${issuedToken.name}`;
        amountStr = `${issuedToken.amount} ${issuedToken.name}`;
      } else {
        // Send transactions
        const foreignOutputs = tx.outputs.filter(i => !this.props.account.isMine(i));
        const ergsSent = foreignOutputs.reduce((sum, {value}) => sum + value, 0);
        const tokensSent = this.props.account.boxesToBalances(foreignOutputs, false);
        if (foreignOutputs.length === 1) {
          // Only fee output is present - transfer to self
          action = 'Self transfer';
          amountStr = '';
        } else if (tokensSent.length === 0) {
          // ERG transfer transaction
          action = 'Sent ERG';
          amountStr = `-${((ergsSent - feeValue) / unitsInOneErgo)} ERG`;
        } else {
          // Custom transfer transaction - extract the first one
          const token = tokensSent[0];
          fee = '0.0011 ERG';
          action = `Sent ${token.name}`;
          amountStr = `-${token.amount} ${token.name}`;
        }
      }
    }


    return {
      action: action,
      amountStr: amountStr,
      fee: fee,
      date: date.toLocaleDateString('en-US').concat(' at ').concat(date.toLocaleTimeString('en-US')),
      explorerHref: `${Constants.explorerURL}/en/transactions/${tx.id}`
    }
  };

  public render() {

    const txProps = this.txToProps(this.props.tx);

    return (
      <div className={'transactionDiv '.concat(this.props.confirmed ? 'txConfirmed' : 'txUnconfirmed')}>
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
