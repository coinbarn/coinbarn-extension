import React from 'react'
import InputMessages from './InputMessages';

interface IInputBlockMaxProps {
  maxValue: number
  validate: (value: number) => string
  name: string
  large: boolean
  onUpdate: () => void
}

interface IInputBlockMaxState {
  maxValue: number
  value: number
  isValid: boolean | undefined
  error: string
}

export default class InputBlockMax extends React.Component<IInputBlockMaxProps, IInputBlockMaxState> {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      isValid: undefined,
      maxValue: this.props.maxValue,
      value: 0,
    }
  }

  public maxClick = () => {
    this.updateValue(this.state.maxValue);
  };

  public handleUserInput(e) {
    this.updateValue(Number(e.target.value));
  }

  public render() {
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
          <input type='number'
                 className={this.props.large ? 'fts inputLarge' : 'fts'}
                 value={this.state.value}
                 onChange={this.handleUserInput.bind(this)}/>
          <button className='smallBtn' onClick={this.maxClick}> MAX</button>
        </div>
        <InputMessages msg='FEE: 0.001 ERG' errorMsg={this.state.error} />
      </div>
    );
  }

  private updateValue(value) {
    const error = this.props.validate(value);
    const isValid = error === '';
    this.setState({value: value, error: error, isValid: isValid},
      this.props.onUpdate);
  }
}
