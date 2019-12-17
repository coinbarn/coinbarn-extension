import React from 'react';
import InputMessages from './InputMessages';

interface IInputBlockProps {
  large: boolean,
  name: string,
  onUpdate: () => void
  type: string
  validate: (value: string) => string
}

interface IInputBlockState {
  value: string
  isValid: boolean
  error: string
}

export default class InputBlock extends React.Component<IInputBlockProps, IInputBlockState> {

  public static defaultProps = {
    large: false,
    name: 'name',
    onUpdate: () => {},
    type: 'text',
  };

  constructor(props) {
    super(props);
    this.state = {
      error: 'error',
      isValid: false,
      value: '',
    }
  }

  public handleUserInput(e) {
    const value = e.target.value;
    const error = this.props.validate(value);
    const isValid = error === '';
    this.setState({value: value, error: error, isValid: isValid},
      this.props.onUpdate);
  }


  public render() {
    let className = this.props.large ? 'validateInputLarge' : 'validateInput';
    if (this.state.value !== '') {
      if (this.state.isValid) {
        className = className.concat(' validInput');
      } else {
        className = className.concat(' invalidInput');
      }
    }

    return (
      <div className={className}>
        <div className='inputLabel ffn'>{this.props.name}</div>
        <input type={this.props.type} className='fts'
               onChange={this.handleUserInput.bind(this)} value={this.state.value}/>
        <InputMessages msg='' errorMsg={this.state.error} />
      </div>
    );
  }
}
