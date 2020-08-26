import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function Topbar(props) {
  const toggleSidebar = () => {
    props.updateSidebar();
  }

  return (
    <div className='topbar'>
      <div className='menu-toggle' onClick={toggleSidebar}>
        <div className='bar1'></div>
        <div className='bar2'></div>
        <div className='bar3'></div>
      </div>
      <div className='logo-container'>
        <div>
          <Link to='/'>TwitchReact</Link>
        </div>
      </div>
    </div>
  )
}

export default Topbar;