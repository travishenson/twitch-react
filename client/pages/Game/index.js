import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';

import StreamCard from '../../components/StreamCard';

function Game(props) {
  const [gameInfo, setGameInfo] = useState({ name: '', box_art_url: '' });
  const [streams, setStreams] = useState([]);

  const parseBoxArtUrl = (url) => {
    return url.replace('{width}', '272').replace('{height}', '380');
  }

  useEffect(() => {
    let mounted = true;

    const gameID = props.match.params.id;

    const fetchGameData = (id) => {
      axios.get('/api/twitch/games/' + id)
        .then(function (response) {
          const gameData = response.data.gameData[0];
          if (mounted) {
            document.title = `${gameData.name} - TwitchReact`;
            setGameInfo(gameData);
          }
        })
      
      axios.get('/api/twitch/streams/' + id)
        .then(function (response) {
          const streamsData = response.data.streamsData;
          if (mounted) {
            setStreams(streamsData);
          }
        })
    }

    fetchGameData(gameID);

    return () => {
      mounted = false;
    }
  }, [])

  return (
    <div className='game'>
      <h1>{gameInfo.name}</h1>
      <img src={parseBoxArtUrl(gameInfo.box_art_url)} alt={`${gameInfo.name}-box-art`} />
      <div className='streamsSection'>
        <h2>Here are some popular {gameInfo.name} streams</h2>
        <div className='streamsGrid'>
          {streams.map((stream) => (
            <StreamCard
              id={stream.id}
              title={stream.title}
              userID={stream.user_id}
              username={stream.user_name}
              viewers={stream.viewer_count}
              thumbnail={stream.thumbnail_url}
              key={stream.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Game;