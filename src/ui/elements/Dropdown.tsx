import React from 'react';

interface IDropdownProps {
  list: string[]
  keys?: string[]
  onUpdate: () => void
}

interface IDropdownState {
  expanded: boolean,
  currentIndex: number
}

export default class Dropdown extends React.Component<IDropdownProps, IDropdownState> {
  public static defaultProps = {
    onUpdate: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      expanded: false,
    };
  }

  public toggleList() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  public currentValue(): string {
    return this.props.list[this.state.currentIndex];
  }

  public currentKey(): string {
    return this.key(this.state.currentIndex);
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
              return <li key={this.key(index)} className="dd-list-item" onClick={() => {
                this.setState({currentIndex: index}, () => this.props.onUpdate());
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

  private key(index: number): string  {
    let key = this.props.list[index];
    if (this.props.keys) {
      key = this.props.keys[index];
    }
    return key;
  }
}
