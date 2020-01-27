import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return(
        <nav className="main-nav">
            <ul>
                <li><Link to="/beaches">Beaches</Link></li>
                <li><Link to='/mountains'>Mountains</Link></li>
                <li><Link to='/forests'>Forests</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;