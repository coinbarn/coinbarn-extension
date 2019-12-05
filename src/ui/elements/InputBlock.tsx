import React from 'react';

interface InputBlockProps {
  name: string,
  error: string,
  isPassword: boolean,
  large: boolean,
  valid?: boolean
}

export default class InputBlock extends React.Component<InputBlockProps> {
  static defaultProps = {
    name: 'name',
    error: 'error',
    isPassword: false,
    large: false
  };

  render() {
    let className = this.props.large ? 'validateInputLarge' : 'validateInput';
    if( this.props.valid != undefined ){
      if( this.props.valid ){
        className = className.concat(' validInput');
      } else {
        className = className.concat(' invalidInput');
      }
    }

    return (
      <div className={className}>
        <div className='inputLabel ffn'>{this.props.name}</div>
        <input type={this.props.isPassword ? 'password' : 'text'} className='fts' />
        <div className='errorDiv'>{this.props.error}</div>
      </div>
    );
  }
}
