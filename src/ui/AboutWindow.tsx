import React from 'react';
import Constants from "../Constants";

interface IAboutWindowProps {
	toggle: (a: any) => void
}


export default class AboutWindow extends React.Component<IAboutWindowProps> {
  public render() {
    return (
			<div className='menu'>
    		<button className='backBtnWhite' onClick={this.props.toggle}></button>
    		<div className='greeting'>About</div>
    		<h1>CoinBarn Version</h1>
				{/*TODO: get version automatically*/}
    		<h1>0.1.0</h1>
    		<h1 className='documents'>Documents</h1>
    		<ul>
    		  <li><h3> <a target="_blank" rel="noopener noreferrer" href={Constants.privacyURL}>Privacy policy</a></h3> </li>
    		  <li><h3> <a target="_blank" rel="noopener noreferrer" href={Constants.termsURL}>Terms of use</a>  </h3> </li>
    		  {/*<li><h3> <a href='#'>Attributions</a>  </h3> </li>*/}
    		</ul>
    		<div className='footer'>
    		  <ul>
    		    <li><h3><a href='#'>Support</a></h3></li>
    		    <li><h3><a href='#'>Site</a></h3></li>
    		    <li><h3><a href='#'>Email us!</a></h3></li>
    		  </ul>
    		</div>
			</div>
    );
  }
}

