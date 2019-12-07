import React from 'react';

export default class AboutWindow extends React.Component {
  public render() {
    return (
			<div className='menu'>
    		<button className='backBtnWhite'></button>
    		<div className='greeting'>About</div>
    		<h1>CoinBarn Version</h1>
    		<h1>0.0.1</h1>
    		<h1 className='documents'>Documents</h1>
    		<ul>
    		  <li><h3> <a href=#>Privacy policy</a></h3> </li>
    		  <li><h3> <a href=#>Terms of use</a>  </h3> </li>
    		  <li><h3> <a href=#>Attributions</a>  </h3> </li>
    		</ul>
    		<div class='footer'>
    		  <ul>
    		    <li><h3><a href=#>Support</a></h3></li>
    		    <li><h3><a href=#>Site</a></h3></li>
    		    <li><h3><a href=#>Email us!</a></h3></li>
    		  </ul>
    		</div>
			</div>
    );
  }
}

