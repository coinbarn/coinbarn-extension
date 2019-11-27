import React from 'react';
import back from '../../img/ui/back.png';
import back_dark from '../../img/ui/back_dark.png';

export default class ContinueBackButtons extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <div className="buttons">
          <input type="submit" disabled={!this.props.formValid} value="Continue"
                 onClick={this.props.onSubmit}
                 className="button green-button continue"/>
          {/*<a href="#" className='back'><img src={back} alt="back" onClick={this.onBack} />Back</a>*/}
          <a href="#" className="back">
            <img src={back} alt="" onClick={this.props.onBack}/>
            <img src={back_dark} alt="" onClick={this.props.onBack}/>
            Back
          </a>
        </div>
    );
  }
}

