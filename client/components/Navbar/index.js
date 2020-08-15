import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function Navbar() {
  return (
    <nav>
      <Link to='/' className='logo'>
        <div>Twitch React</div>
      </Link>
      <ul>
        <Link to='/'>
          <li>Home</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Navbar;