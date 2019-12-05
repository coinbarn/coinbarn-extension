import React from 'react'

interface InputBlockMaxProps {
  maxValue: number
  validate: (value: number) => string
  name: string
  large: boolean
}

interface InputBlockMaxState {
  value: number
  isValid: boolean | undefined
  error: string
}

export default class InputBlockMax extends React.Component<InputBlockMaxProps, InputBlockMaxState> {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isValid: false,
      error: ''
    }
  }

  maxClick = () => {
    this.updateValue(this.props.maxValue);
  };

  handleUserInput(e) {
    this.updateValue(Number(e.target.value));
  }

  private updateValue(value) {
    const error = this.props.validate(value);
    const isValid = error === '';
    this.setState({value: value, error: error, isValid: isValid});
  }

  render() {
    let className = 'validateInputMax';
    if (this.state.isValid !== undefined) {
      if (this.state.isValid) {
        className = className.concat(' validInput');
      } else {
        className = className.concat(' invalidInput');
      }
    }

    return (
      <div className={className}>
        <div className='inputLabel ffn'>{this.props.name}</div>
        <div className='inputMax'>
          <input type='number' className={this.props.large ? 'fts inputLarge' : 'fts'} value={this.state.value}
                 onChange={this.handleUserInput.bind(this)}/>
          <button className='smallBtn' onClick={this.maxClick}> MAX</button>
        </div>
        <div className='errorDiv'>{this.state.error}</div>
      </div>
    );
  }
}
