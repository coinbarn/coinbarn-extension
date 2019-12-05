import React from 'react'
import InputBlock from './InputBlock'

export default class InputBlockMax extends InputBlock {
  render() {
    let className = 'validateInputMax';
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
          <div className='inputMax'>
            <input type={this.props.isPassword ? 'password' : 'text'} className={this.props.large ? 'fts inputLarge' : 'fts'} />
            <button className='smallBtn'> MAX </button>
          </div>
        <div className='errorDiv'>{this.props.error}</div>
      </div>
    );
  }
}
