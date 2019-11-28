import React from 'react';
import back from '../../img/ui/back.png';
import back_dark from '../../img/ui/back_dark.png';
import PublicAccount from "../../PublicAccount";


interface BackProps {
  onBack: () => void
}

export default class Back extends React.Component<BackProps, {}> {

  constructor(props: BackProps) {
    super(props);
  }

  render() {
    return (
      <a href="#" onClick={this.props.onBack}><img src={back} alt=""/>Back</a>
    );
  }
}

