import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './style.scss';

import { SidebarElement } from '../index';

function Sidebar(props) {
  const [topStreams, setTopStreams] = useState([]);

  useEffect(() => {
    let mounted = true;
    
    const fetchTopStreams = () => {
      axios.get('/api/twitch/topstreams')
        .then((response) => {
          setTopStreams(response.data.streamsData);
        })
        .catch((err) => console.log('Error: ' + err))
    }

    fetchTopStreams();

    return () => {
      mounted = false;
    }
  }, [])

  const handleClick = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 1000) {
      props.setSidebarCollapsed(true)
    }
  }

  return (
    <div className={props.collapsed ? 'sidebar sidebar-closed' : 'sidebar sidebar-open'}>
      <nav>
        <NavLink exact to='/' activeClassName='sidebar-active' onClick={handleClick}>
          <div>
            <p>Home</p>
          </div>
        </NavLink>
      </nav>
      <div className='sidebar-section'>
        <div className='section-title'>
          <p>Featured Games</p>
        </div>
        <SidebarElement type='game' id='27471'>Minecraft</SidebarElement>
        <SidebarElement type='game' id='512980'>Fall Guys</SidebarElement>
        <SidebarElement type='game' id='21779'>League of Legends</SidebarElement>
        <SidebarElement type='game' id='33214'>Fortnite</SidebarElement>
        <SidebarElement type='game' id='32399'>CS:GO</SidebarElement>
      </div>
      <div className='sidebar-section'>
        <div className='section-title'>
          <p>Top Streamers</p>
        </div>
        {topStreams.length === 0 ?
          <SidebarElement>Loading...</SidebarElement>
          :
          topStreams.map((stream) => (
            <SidebarElement 
              key={stream.user_id} 
              type='user' 
              id={stream.user_id}
            >
              {stream.user_name}
            </SidebarElement>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar;