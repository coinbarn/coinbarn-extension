import React from 'react';


interface ContinueProps {
  submit: () => void
  disabled: boolean
}

export default class Continue extends React.Component<ContinueProps, {}> {

  render() {
    return (
      <input className="button green-button continue" disabled={this.props.disabled} type='button' value="Continue"
             onClick={this.props.submit}/>
    );
  }
}

