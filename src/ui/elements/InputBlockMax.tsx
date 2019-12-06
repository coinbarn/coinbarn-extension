import React from 'react'

interface IInputBlockMaxProps {
  maxValue: number
  validate: (value: number) => string
  name: string
  large: boolean
  onUpdate: () => void
}

interface IInputBlockMaxState {
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
      value: 0,
    }
  }

  public maxClick = () => {
    this.updateValue(this.props.maxValue);
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
        <div className='errorDiv'>{this.state.error}</div>
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
