import React from 'react';

export default class HomeHeader extends React.Component {
  public render(){
    return(
      <div className='homeHeader'>
        <button className='menuBtn' />
        <button className='settingsBtn' />
      </div>
    );
  }
}
