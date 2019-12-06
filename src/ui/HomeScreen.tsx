import React from 'react';
import HomeHeader from './elements/HomeHeader';
import InfoProfile from './elements/InfoProfile';
import TabSelector from './elements/TabSelector';
import SendTab from './elements/SendTab';
import TransactionsTab from './elements/TransactionsTab';
import IssueTab from './elements/IssueTab';
import Account from "../Account";

interface HomeScreenProps {
  account: Account
  updateState: (a: any) => void
}

interface HomeScreenState {
  account: Account
  currTabIndex: keyof Array<object>
}

export default class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
  infoProfileElement: any;
  interval: any;

  constructor(props) {
    super(props);
    this.state = {
      account: this.props.account,
      currTabIndex: 0
    };
    this.infoProfileElement = React.createRef();
  }

  refresh() {
    this.state.account.refresh().then(
      e => {
        this.setState({account: this.state.account});
      }
    )
  }

  componentDidMount() {
    this.refresh();
    this.interval = setInterval(() => this.refresh(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setCurrTab(currTabIndex) {
    this.setState({currTabIndex: currTabIndex});
  }

  render() {
    const tabs = [<SendTab account={this.state.account} setCurrTab={this.setCurrTab.bind(this)}/>,
      <TransactionsTab/>,
      <IssueTab/>];

    return (
      <div className='homeScreen'>
        <HomeHeader/>
        <InfoProfile account={this.state.account}/>
        <TabSelector setCurrTab={this.setCurrTab.bind(this)}/>
        {tabs[this.state.currTabIndex]}
      </div>
    );
  }
}

