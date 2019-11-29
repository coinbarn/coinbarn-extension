import React from 'react';
import homaImg from '../../img/1screen/homa3.png';
import CoinbarnStorage from "../../CoinbarnStorage";
import Dropdown from '../elements/Dropdown';
import Continue from '../elements/Continue';
import PublicAccount from '../../PublicAccount';

interface WelcomeProps {
  updateState: (a: any) => void
}

export default class WelcomeScreen extends React.Component<WelcomeProps, {}> {

  dropdownElement: any;

  constructor(props) {
    super(props);
    this.dropdownElement = React.createRef();
  }


  accountItems() {
    let items: Element[] = [];
    for (let acc of CoinbarnStorage.getAccountNames()) {
      items.push(acc);
    }
    return items;
  }

  submit = () => {
    const name = this.dropdownElement.current.state.currentValue;
    const newState = {
      account: new PublicAccount(name, ''),
      screen: 'password'
    };
    this.props.updateState(newState);
  };

  render() {
    return (
        <div className="container">
          <div className="screen screen-1 welcome">
            <div className="img-wrap">
              <img src={homaImg} alt="homa"/>
            </div>
            <h2 className="note">Welcome back!</h2>


            <form>
              {/*<div class="select-name">*/}
              <Dropdown list={this.accountItems()} ref={this.dropdownElement}/>
              {/*</div>*/}

              <div className="buttons">
                <Continue disabled={false} submit={this.submit}/>
              </div>
            </form>

            <div className="account-links">
              <p>
                <a href="#" onClick={() => this.props.updateState({screen: 'register'})}>Create New Account</a>
              </p>
              <p>
                <a href="#">Import Account</a>
              </p>

            </div>
          </div>
        </div>
    );
  }
}

