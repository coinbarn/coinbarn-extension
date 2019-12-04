import React from 'react';
import HomeHeader from './elements/HomeHeader';
import InfoProfile from './elements/InfoProfile';
import TabSelector from './elements/TabSelector';
import SendTab from './elements/SendTab';
import TransactionsTab from './elements/TransactionsTab';
import IssueTab from './elements/IssueTab';

interface HomeScreenProps {
}

interface HomeScreenState {
  currTabIndex: keyof Array<object>
}

export default class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState>{
  tabs: Array<object>;


  constructor(props) {
    super(props);
    this.tabs = [<SendTab />, <TransactionsTab />, <IssueTab />];
    this.state = {
      currTabIndex: 0
    }
  }

  setCurrTab(currTabIndex) {
    this.setState({currTabIndex: currTabIndex});
  }

  render() {
    return (
      <div className='homeScreen'>
        <HomeHeader />
        <InfoProfile />
        <TabSelector setCurrTab={this.setCurrTab.bind(this)} />
        {this.tabs[this.state.currTabIndex]}
      </div>
    );
  }
}

