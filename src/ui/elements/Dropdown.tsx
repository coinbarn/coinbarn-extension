import React from 'react';

interface IDropdownProps {
  list: string[]
  keys?: string[]
}

interface IDropdownState {
  expanded: boolean,
  currentIndex: keyof string[]
  currentKey: string
  currentValue: string
}

export default class Dropdown extends React.Component<IDropdownProps, IDropdownState> {
  constructor(props) {
    super(props);
    let key = this.props.list[0];
    if(this.props.keys) {
      key = this.props.keys[0];
    }
    this.state = {
      currentIndex: 0,
      currentKey: key,
      currentValue: this.props.list[0],
      expanded: false,
    };
  }

  public toggleList() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  public render() {
    const list = this.props.list;
    const {expanded, currentIndex} = this.state;
    return (
      <div className="dd-wrapper">
        <div className={expanded ? "dd-header-expanded" : "dd-header"} onClick={this.toggleList.bind(this)}>
          <div className="dd-header-title">{list[currentIndex]}</div>
          <div className="dd-trigger"></div>
        </div>
        {
          expanded ? <ul className="dd-list">
            {list.map((item, index) => {
              let key = item;
              if (this.props.keys) {
                key = this.props.keys[index]
              }
              return <li key={key} className="dd-list-item" onClick={() => {
                this.setState({currentIndex: index, currentValue: item, currentKey: key});
                this.toggleList();
              }}>
                <div className='dd-background-div'>{item}</div>
              </li>
            })}
          </ul> : ''
        }
      </div>
    );
  }
}
