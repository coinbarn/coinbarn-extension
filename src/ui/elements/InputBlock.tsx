import React from 'react';

interface IInputBlockProps {
  name: string,
  isPassword: boolean,
  large: boolean,
  error: string,
  valid?: boolean
}

// use InputBlockF
export default class InputBlock extends React.Component<IInputBlockProps> {
  public static defaultProps = {
    error: 'error',
    isPassword: false,
    large: false,
    name: 'name',
  };

  public render() {
    let className = this.props.large ? 'validateInputLarge' : 'validateInput';
    if( this.props.valid !== undefined ){
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
