import React from 'react';

interface IHomeHeaderProps {
  toggleSettings: () => void
  toggleMenuBlock: () => void
}

export default class HomeHeader extends React.Component<IHomeHeaderProps, {}> {

  public render() {
    return (
      <div className='homeHeader'>
        <button className='menuBtn' onClick={this.props.toggleSettings}/>
        <button className='settingsBtn' onClick={this.props.toggleMenuBlock}/>
      </div>
    );
  }
}
