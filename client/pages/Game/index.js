import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';

import StreamCard from '../../components/StreamCard';

function Game(props) {
  const [gameInfo, setGameInfo] = useState({ name: '', box_art_url: '' });
  const [streams, setStreams] = useState([]);
  const [igdbData, setIgdbData] = useState({
    criticRating: '',
    criticRatingCount: '',
    gameModes: [],
    genres: [],
    name: '',
    platforms: [],
    releaseDate: '',
    screenshots: [],
    summary: '',
    themes: [],
    totalRating: '',
    totalRatingCount: '',
    url: '',
    userRating: '',
    userRatingCount: ''
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

  const parseUnixDate = (unix) => {
    let UTCString = new Date(unix * 1000).toUTCString().substring(4, 17);
    let date = UTCString.substring(0, 3);
    let month = UTCString.substring(4, 8);
    let year = UTCString.substring(8, 12);

    if (date > 3 && date < 21) date += 'th';
    switch (date % 10) {
      case 1:  date += "st";
      case 2:  date += "nd";
      case 3:  date += "rd";
      default: date += "th";
    }

    return `${month} ${date}, ${year}`;
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
        criticRating: igdbGameData.aggregated_rating,
        criticRatingCount: igdbGameData.aggregated_rating_count,
        gameModes: igdbGameData.game_modes,
        genres: igdbGameData.genres,
        name: igdbGameData.name,
        platforms: igdbGameData.platforms,
        releaseDate: igdbGameData.first_release_date,
        screenshots: igdbGameData.screenshots,
        summary: igdbGameData.summary,
        themes: igdbGameData.themes,
        totalRating: igdbGameData.total_rating,
        totalRatingCount: igdbGameData.total_rating_count,
        url: igdbGameData.url,
        userRating: igdbGameData.rating,
        userRatingCount: igdbGameData.rating_count
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='game'>
      <div className='gameSection'>
        <div className='mainInfo'>
          <h1>{gameInfo.name}</h1>
          <img src={parseBoxArtUrl(gameInfo.box_art_url)} alt={`${gameInfo.name}-box-art`} />
          <p>View {igdbData.name} on IGDB: {igdbData.url}</p>
          <div className='ratings'>
            <p>Total rating: {igdbData.totalRating} from {igdbData.totalRatingCount} critics and users</p>
            <p>Critic ratings: {igdbData.criticRating} from {igdbData.criticRatingCount} critics</p>
            <p>IGDB user ratings: {igdbData.userRating} from {igdbData.userRatingCount} users</p>
          </div>
        </div>
        <div className='detailedInfo'>
          <h2>About {gameInfo.name}</h2>
          <p>Release date: {parseUnixDate(igdbData.releaseDate)}</p>
          <p>Summary: {igdbData.summary}</p>
          <p>Need to add maps for game modes, genres, platforms, screenshots, and themes.</p>
        </div>
      </div>
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