import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.scss';

function StreamCard(props) {
  const [streamInfo, setStreamInfo] = useState({
    streamId: '',
    userId: '',
    userLogin: '',
    userDisplay: ''
  })

  const parseThumbnailUrl = (url) => {
    return url.replace('{width}', '444').replace('{height}', '250');
  }

  const compareNames = (login, display) => {
    return login.toLowerCase() === display.toLowerCase();
  }

  const fetchUserInfo = (user_id) => {
    axios.get('/api/twitch/users/' + user_id)
      .then(function (response) {
        let userData = response.data.userData[0];
        setStreamInfo({
          streamId: props.id,
          userId: props.userID,
          userLogin: userData.login,
          userDisplay: userData.display_name
        })
      })
  }

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchUserInfo(props.userID);
    }

    return () => {
      mounted = false;
    }
  }, [])

  return (
    <div className='streamCardContainer'>
      <Link to={`/user/${streamInfo.userLogin}`}>
        <div className='streamCard'>
          <img src={parseThumbnailUrl(props.thumbnail)} alt={`${props.id}-thumbnail`} />
          <div className='streamInfo'>
            <h2>{props.title}</h2>
            {
              compareNames(streamInfo.userLogin, streamInfo.userDisplay) ?
              streamInfo.userDisplay :
              `${streamInfo.userDisplay} (${streamInfo.userLogin})`
            }
            <p>{props.viewers} viewers</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default StreamCard;