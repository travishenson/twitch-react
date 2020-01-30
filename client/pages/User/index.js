import React, { useEffect, useState } from 'react';
import './style.scss';

function User(props) {
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    loginName: ''
  })

  const loginName = props.match.params.username;

  useEffect(() => { 
    document.title = `${loginName} - TwitchReact`;
   })

  return (
    <div>
      <h1>{loginName}'s Profile</h1>
      <p>Currently streaming:</p>
      <div className='streamContainer'>
        <iframe
          className='twitchStream'
          src={`https://player.twitch.tv/?channel=${loginName}`}
          frameBorder='0'
          scrolling='no'
          allowFullScreen
        >
        </iframe>
      </div>
    </div>
  )
}

export default User;