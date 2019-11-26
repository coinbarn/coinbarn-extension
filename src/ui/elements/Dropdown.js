import React from 'react';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      currentIndex: 0
    };
  }

  toggleList(){
    this.setState({
      expanded: ! this.state.expanded
    });
  }

  render(){
    const list = this.props.list;
    const {expanded, currentIndex} = this.state;
    return(
      <div className="dd-wrapper">
        <div className="dd-header" onClick={this.toggleList.bind(this)}>
          <div className="dd-header-title">{list[currentIndex]}</div>
        </div>
        {
          expanded ? <ul className="dd-list">
            {list.map((item, index) => (
              <li className="dd-list-item" onClick={() => {
                this.setState({currentIndex: index});
                this.toggleList();
              }}>{item}</li>
            ))} 
          </ul> : ''
        }
      </div>
    );
  }
}
