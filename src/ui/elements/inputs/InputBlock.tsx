import React from 'react';
import InputMessages from './InputMessages';

interface IInputBlockProps {
  large: boolean,
  name: string,
  onUpdate: () => void
  regexp: RegExp,
  validate: (value: string) => string,
  password: boolean
}

interface IInputBlockState {
  value: string
  isValid: boolean
  error: string
}

export default class InputBlock extends React.Component<IInputBlockProps, IInputBlockState> {

  public static defaultProps = {
    large: false,
    password: false,
    name: 'name',
    onUpdate: () => {},
    regexp: /.*/
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
    if (this.props.regexp.test(e.target.value)) {
      this.updateValue(e.target.value);
    }
  }

  private updateValue(value) {
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
        <input className='fts' type={this.props.password? 'password' :''}
               onChange={this.handleUserInput.bind(this)} value={this.state.value}/>
        <InputMessages msg='' errorMsg={this.state.error} />
      </div>
    );
  }
}
