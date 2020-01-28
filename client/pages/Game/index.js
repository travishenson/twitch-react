import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import './style.scss';

function Game(props) {
  const [gameInfo, setGameInfo] = useState({ name: '', box_art_url: '' });

  const parseBoxArtUrl = (url) => {
    return url.replace('{width}', '272').replace('{height}', '380');
  }

  useEffect(() => {
    let mounted = true;

    const fetchGameData = (id) => {
      axios.get('/api/twitch/games/' + id)
        .then(function (response) {
          const gameData = response.data.gameData[0];
          if (mounted) {
            document.title = `${gameData.name} on TwitchReact`;
            setGameInfo(gameData);
          }
      })
    }

    fetchGameData(props.match.params.id);

    return () => {
      mounted = false;
    }
  }, [])

  return (
    <div className='game'>
      <h1>{gameInfo.name}</h1>
      <img src={parseBoxArtUrl(gameInfo.box_art_url)} alt={`${gameInfo.name}-box-art`} />
    </div>
  )
}

export default Game;