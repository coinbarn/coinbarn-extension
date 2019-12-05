import React from 'react';

interface InputBlockProps {
  name: string,
  isPassword: boolean,
  large: boolean,
  validate: (value: string) => string
  onUpdate: () => void
}

interface InputBlockState {
  value: string
  isValid: boolean
  error: string
}

export default class InputBlockF extends React.Component<InputBlockProps, InputBlockState> {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isValid: false,
      error: 'error'
    }
  }

  static defaultProps = {
    name: 'name',
    isPassword: false,
    large: false
  };

  handleUserInput(e) {
    const name = e.target.id;
    let value = '';
    if (name !== 'checkbox') {
      value = e.target.value;
    } else {
      value = e.target.checked;
    }
    const error = this.props.validate(value);
    const isValid = error === '';
    this.setState({value: value, error: error, isValid: isValid},
      this.props.onUpdate);
  }


  render() {
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
        <input type={this.props.isPassword ? 'password' : 'text'} className='fts'
               onChange={this.handleUserInput.bind(this)} value={this.state.value}/>
        <div className='errorDiv'>{this.state.error}</div>
      </div>
    );
  }
}
