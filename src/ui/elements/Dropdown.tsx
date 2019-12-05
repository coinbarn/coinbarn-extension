import React from 'react';

interface DropdownProps {
  list: Array<string>
}

interface DropdownState {
  expanded: boolean,
  currentIndex: keyof Array<string>
  currentValue: string
}

export default class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      currentValue: this.props.list[0],
      currentIndex: 0
    };
  }

  toggleList() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
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
