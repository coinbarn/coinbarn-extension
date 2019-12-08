import React from 'react';
import Account from "../Account";
import HomeHeader from './elements/HomeHeader';
import InfoProfile from './elements/InfoProfile';
import IssueTab from './elements/IssueTab';
import SendTab from './elements/SendTab';
import TabSelector from './elements/TabSelector';
import TransactionsTab from './elements/TransactionsTab';
import Popup, {IPopupStatus} from "./elements/Popup";

interface IHomeScreenProps {
  account: Account
  updateState: (a: any) => void
}

interface IHomeScreenState {
  account: Account
  currTabIndex: keyof object[]
  popupStatus: IPopupStatus
}

export default class HomeScreen extends React.Component<IHomeScreenProps, IHomeScreenState> {
  public infoProfileElement: any;
  public interval: any;

  constructor(props) {
    super(props);
    this.state = {
      account: this.props.account,
      currTabIndex: 0,
      popupStatus: {
        show: false
      }
    };
    this.infoProfileElement = React.createRef();
  }

  public refresh() {
    this.state.account.refresh().then(
      e => {
        this.setState({account: this.state.account});
      }
    )
  }

  public componentDidMount() {
    this.refresh();
    this.interval = setInterval(() => this.refresh(), 60000);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public setCurrTab(currTabIndex: number, refresh: boolean = false) {
    this.setState({currTabIndex: currTabIndex});
    if (refresh) {
      this.refresh()
    }
  }

  public setPopup(status: IPopupStatus) {
    this.setState({popupStatus: status})
  }

  public render() {
    const tabs = [<SendTab account={this.state.account}
                           setPopup={this.setPopup.bind(this)}/>,
      <TransactionsTab account={this.state.account}/>,
      <IssueTab account={this.state.account}
                setPopup={this.setPopup.bind(this)}/>];

    return (
      [
        <div className='homeScreen'>
          <HomeHeader/>
          <InfoProfile account={this.state.account}/>
          <TabSelector setCurrTab={this.setCurrTab.bind(this)}/>
          {tabs[this.state.currTabIndex]}
        </div>,
        <Popup status={this.state.popupStatus} onClose={() => this.setPopup({show: false})}/>
      ]
    );
  }
}

