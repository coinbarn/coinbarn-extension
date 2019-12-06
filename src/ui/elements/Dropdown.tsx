import React from 'react';

interface IDropdownProps {
  list: string[]
}

interface IDropdownState {
  expanded: boolean,
  currentIndex: keyof string[]
  currentValue: string
}

export default class Dropdown extends React.Component<IDropdownProps, IDropdownState> {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
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
            {list.map((item, index) => (
              <li key={item} className="dd-list-item" onClick={() => {
                this.setState({currentIndex: index, currentValue: item});
                this.toggleList();
              }}>
                <div className='dd-background-div'>{item}</div>
              </li>
            ))}
          </ul> : ''
        }
      </div>
    );
  }
}
