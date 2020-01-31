import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';

import StreamCard from '../../components/StreamCard';

function Game(props) {
  const [gameInfo, setGameInfo] = useState({ name: '', box_art_url: '' });
  const [streams, setStreams] = useState([]);
  const [igdbData, setIgdbData] = useState({
    companies: [],
    genres: [],
    platforms: [],
    rating: '',
    releaseDate: '',
    screenshots: [],
    summary: ''
  });

  const gameId = props.match.params.id;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchData();
    }

    return () => {
      mounted = false;
    }
  }, [])

  const parseBoxArtUrl = (url) => {
    return url.replace('{width}', '272').replace('{height}', '380');
  }

  const fetchData = async () => {
    try {
      const twitchGameResponse = await axios.get('/api/twitch/games/' + gameId);
      const twitchGameData = await twitchGameResponse.data.gameData[0];
      document.title = `${twitchGameData.name} - TwitchReact`;
      setGameInfo(twitchGameData);

      const twitchStreamResponse = await axios.get('/api/twitch/streams/' + gameId);
      const twitchStreamData = await twitchStreamResponse.data.streamsData;
      setStreams(twitchStreamData);

      const igdbGameResponse = await axios.get('/api/igdb/games/' + twitchGameData.name);
      const igdbGameData = await igdbGameResponse.data.igdbData;
      setIgdbData({
        companies: igdbGameData.involved_companies,
        genres: igdbGameData.genres,
        name: igdbGameData.name,
        platforms: igdbGameData.platforms,
        rating: igdbGameData.rating,
        releaseDate: igdbGameData.release_dates,
        screenshots: igdbGameData.screenshots,
        summary: igdbGameData.summary
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='game'>
      <h1>{gameInfo.name}</h1>
      <img src={parseBoxArtUrl(gameInfo.box_art_url)} alt={`${gameInfo.name}-box-art`} />
      <h2>Game Info</h2>
      <ul>
        <li>Name: {igdbData.name}</li>
        <li>Rating: {igdbData.rating}</li>
        <li>Summary: {igdbData.summary}</li>
      </ul>
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