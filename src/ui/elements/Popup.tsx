import React from 'react';

interface IPopupProps {
  onClose: () => void
  status: IPopupStatus
}

export interface IPopupStatus {
  show: boolean
  title?: string
  line1?: string
  line2?: string
}


export default class Popup extends React.Component<IPopupProps, {}> {

  public render() {
    if (this.props.status.show) {
      const msg = this.props.status;
      return (
        <div className='overlay'>
          <div className='popup'>
            <button className='closeBtnSmall' onClick={this.props.onClose}></button>
            <div className='greeting'>{msg.title}</div>
            <p>{msg.line1}</p>
            <p>{msg.line2}</p>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}
