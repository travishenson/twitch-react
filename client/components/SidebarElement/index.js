import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.scss';

const SidebarElement = (props) => {
  const [userLogin, setUserLogin] = useState('');

  if (props.type === 'user') {
    useEffect(() => {
      const userIdToSlug = (id) => {
        axios.get('/api/twitch/users/' + id)
          .then(response => {
            setUserLogin(response.data.userData[0].login);
          })
      }
  
      if (props.id !== null) {
        userIdToSlug(props.id);
      }
    }, props.id)
    
    return(
      <Link to={`/user/${userLogin}`}>
        <div className='sidebar-element'>
          <p>{props.children}</p>
        </div>
      </Link>
    )
  }

  if (props.type === 'game') {
    return(
      <Link to={`/game/${props.id}`}>
        <div className='sidebar-element'>
          <p>{props.children}</p>
        </div>
      </Link>
    )
  }
  return(
    <div className='sidebar-element'>
      <p>{props.children}</p>
    </div>
  )
}

export default SidebarElement;