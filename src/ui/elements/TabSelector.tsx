import React from 'react';

interface TabSelectorProps {
  setCurrTab(n: number): void,
}

interface TabSelectorState {
  currTab: keyof Array<object>
}

export default class TabSelector extends React.Component<TabSelectorProps, TabSelectorState> {
  constructor(props) {
    super(props);
    this.state = {
      currTab: 0
    };
  }

  handleRadioSelection(e) {
    const tab = e.target.id.slice(-1); // o___o
    this.props.setCurrTab(tab);
    this.setState({currTab: tab});
  }

  render() {
    return (
      <div className='tabSelector'>
        <input id='tab0' type='radio' name='currTab' checked={this.state.currTab === 0}
               onChange={this.handleRadioSelection.bind(this)}/>
        <label htmlFor='tab0'><h3>Send</h3></label>
        <input id='tab1' type='radio' name='currTab' checked={this.state.currTab === 1}
               onChange={this.handleRadioSelection.bind(this)}/>
        <label htmlFor='tab1'><h3>Transactions</h3></label>
        <input id='tab2' type='radio' name='currTab' checked={this.state.currTab === 2}
               onChange={this.handleRadioSelection.bind(this)}/>
        <label htmlFor='tab2'><h3>Issue</h3></label>
      </div>
    );
  }
}
