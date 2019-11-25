import React from 'react';
import back_menu from '../../img/ui/back-menu.png';

export default class MenuBlock extends React.Component {
    render() {
        return (
            <div className="menu-block">
                <h3 className="note menu-title">
                    <a href="#" className='back'><img src={back_menu} alt="back"/></a>About
                </h3>
                <p>
                    HamStar Version
                </p>
                <p>
                    1.1.1
                </p>
                <div className="documents">
                    <h3 className="menu-title">Documents</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Attributions</a></li>
                    </ul>
                </div>

                <div className="submenu">
                    <ul>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Site</a></li>
                        <li><a href="#">Email us!</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

