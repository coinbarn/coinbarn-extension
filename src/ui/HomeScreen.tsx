import React from 'react';
import HomeHeader from './elements/HomeHeader';
import InfoProfile from './elements/InfoProfile';
import TabSelector from './elements/TabSelector';
import SendTab from './elements/SendTab';
import TransactionsTab from './elements/TransactionsTab';
import IssueTab from './elements/IssueTab';
import PublicAccount from "../PublicAccount";

interface HomeScreenProps {
  account: PublicAccount
  updateState: (a: any) => void
}

interface HomeScreenState {
  account: PublicAccount
  currTabIndex: keyof Array<object>
}

export default class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
  tabs: Array<object>;
  _asyncRequest: any;

  constructor(props) {
    super(props);
    this.tabs = [<SendTab/>, <TransactionsTab/>, <IssueTab/>];
    this.state = {
      account: this.props.account,
      currTabIndex: 0
    }
  }

  componentDidMount() {
    this._asyncRequest = this.state.account.refreshBoxes().then(
      e => {
        this._asyncRequest = null;
        this.setState({account: this.state.account});
      }
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  setCurrTab(currTabIndex) {
    this.setState({currTabIndex: currTabIndex});
  }

  render() {
    return (
      <div className='homeScreen'>
        <HomeHeader/>
        <InfoProfile account={this.props.account}/>
        <TabSelector setCurrTab={this.setCurrTab.bind(this)}/>
        {this.tabs[this.state.currTabIndex]}
      </div>
    );
  }
}

