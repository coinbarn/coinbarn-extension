import React from 'react';

interface IEyedInputBlockProps {
  name: string,
  onUpdate: () => void
  validate: (value: string) => string
}

interface IEyedInputBlockState {
  value: string
  validity: string
  isValid: boolean
  error: string
  type: string
}

export default class EyedInputBlock extends React.Component<IEyedInputBlockProps, IEyedInputBlockState> {

  public static defaultProps = {
    name: 'name',
    onUpdate: () => {},
    type: 'password',
  };

  constructor(props) {
    super(props);
    this.state = {
      error: 'error',
      validity: '',
      value: '',
      isValid: false,
      type: 'password'
    };
  }

  toggleType() {
    this.setState({type: this.state.type==='' ? 'password' : ''});
  }

  public handleUserInput(e) {
    const value = e.target.value;
    const error = this.props.validate(value);
    const isValid = error === '';
    this.setState({
      value: value, 
      error: error, 
      isValid: isValid,
      validity: isValid ? 'validInput' : 'invalidInput'
    }, this.props.onUpdate);
  }

  public render() {
    let className = 'validateInput';
    if (this.state.value !== '') {
      className = className.concat(' ').concat(this.state.validity);
    }

    return (
      <div className={className}>
        <div className='inputLabel ffn'>{this.props.name}</div>
        <input type={this.state.type} className='fts'
               onChange={this.handleUserInput.bind(this)} value={this.state.value}/>
        <button className='eyeButton' onClick={this.toggleType.bind(this)}></button>
        <div className='errorDiv'>{this.state.error ? this.state.error : '\xa0'}</div>
      </div>
    );
  }
}
