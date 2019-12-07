import React from 'react';

interface IInputBlockProps {
  name: string,
  type: string,
  large: boolean,
  validate: (value: string) => string
  onUpdate: () => void
}

interface IInputBlockState {
  value: string
  isValid: boolean
  error: string
}

export default class InputBlockF extends React.Component<IInputBlockProps, IInputBlockState> {

  public static defaultProps = {
    type: 'text',
    large: false,
    name: 'name',
    onUpdate: () => {}
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
        <div className='errorDiv'>{this.state.error}</div>
      </div>
    );
  }
}
