import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'regenerator-runtime/runtime.js';
import './style.scss';

import TwitchPattern from '../../assets/images/twitchpattern.jpg';
import { parseBoxArtUrl, parseUnixDate } from '../../utils/data-parser';
import twitchToIgdb from '../../utils/twitch-to-igdb';

import GameRating from '../../components/GameRating';
import StreamCard from '../../components/StreamCard';

function Game(props) {
  const [gameInfo, setGameInfo] = useState({ name: '', box_art_url: '' });

  const [streams, setStreams] = useState([]);

  const [igdbData, setIgdbData] = useState({
    criticRating: '',
    criticRatingCount: '',
    gameModes: [],
    genres: [],
    headerImageId: '',
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

  const fetchData = async () => {
    try {
      const twitchGameResponse = await axios.get('/api/twitch/games/' + gameId);
      const twitchGameData = await twitchGameResponse.data.gameData[0];
      document.title = `${twitchGameData.name} - TwitchReact`;
      setGameInfo(twitchGameData);

      const twitchStreamResponse = await axios.get('/api/twitch/streams/' + gameId);
      const twitchStreamData = await twitchStreamResponse.data.streamsData;
      setStreams(twitchStreamData);

      let gameSlug = twitchGameData.name.toLowerCase().replace(/[\W]+/gi, '-');
      let parsedSlug = twitchToIgdb(gameSlug);
      const igdbGameResponse = await axios.get('/api/igdb/games/' + parsedSlug);
      const igdbGameData = await igdbGameResponse.data.igdbData;
      
      setIgdbData({
        criticRating: Math.round(igdbGameData.aggregated_rating),
        criticRatingCount: igdbGameData.aggregated_rating_count,
        gameModes: igdbGameData.game_modes,
        genres: igdbGameData.genres,
        headerImageId: igdbGameResponse.data.headerImageId,
        name: igdbGameData.name,
        platforms: igdbGameData.platforms,
        releaseDate: igdbGameData.first_release_date,
        screenshots: igdbGameData.screenshots[0],
        summary: igdbGameData.summary,
        themes: igdbGameData.themes,
        totalRating: Math.round(igdbGameData.total_rating),
        totalRatingCount: igdbGameData.total_rating_count,
        url: igdbGameData.url,
        userRating: Math.round(igdbGameData.rating),
        userRatingCount: igdbGameData.rating_count
      })
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <div className='game'>
      {
      igdbData.url != '' ?
        <>
          <div className='game-header'>
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_original/${igdbData.headerImageId}.jpg`}
              alt={igdbData.name}
              key={igdbData.headerImageId}
            />
          </div>
          <div className='game-section'>
          <div className='game-cover'>
            <img src={parseBoxArtUrl(gameInfo.box_art_url)} alt={`${gameInfo.name}-box-art`} />
          </div>
          <div className='game-info'>
            <h1>{gameInfo.name}</h1>
            <a href={igdbData.url} alt={`${gameInfo.name} on IGDB`} target='_blank'>
              View {gameInfo.name} on IGDB
            </a>
            <GameRating
              totalRating={igdbData.totalRating}
              criticRating={igdbData.criticRating}
              criticRatingCount={igdbData.criticRatingCount}
              userRating={igdbData.userRating}
              userRatingCount={igdbData.userRatingCount}
            />
            <p className='summary'>
              {igdbData.summary}
            </p>
            <div className='secondary-info'>
              <p className='release-date'>
                <span className='bold'>Release date: </span>
                {parseUnixDate(igdbData.releaseDate)}
              </p>
              <p className='genres'>
                <span className='bold'>Genres: </span>
                {igdbData.genres.map((genre, index) => (
                  <span key={genre.id}>{(index ? ', ' : '') + genre.name}</span>
                ))}
              </p>
              <p className='platforms'>
                <span className='bold'>Platforms: </span>
                {igdbData.platforms.map((platform, index) => (
                  <span key={platform.id}>{(index ? ', ' : '') + platform.name}</span>
                ))}
              </p>
              <p className='themes'>
                <span className='bold'>Themes: </span>
                {igdbData.themes.map((theme, index) => (
                  <span key={theme.id}>{(index ? ', ' : '') + theme.name}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
        </>
        :
        <>
          <div className='game-header'>
            <img src={TwitchPattern} alt='twitch-header-image' />
          </div>
          <div className='game-section'>
            <div className='game-cover'>
              <img src={parseBoxArtUrl(gameInfo.box_art_url)} alt={`${gameInfo.name}-box-art`} />
            </div>
            <div className='game-info'>
              <h1>{gameInfo.name}</h1>
            </div>
          </div>
        </>
      }
      <div className='streams-section'>
          <h2>Popular {gameInfo.name} streams</h2>
          <div className='streams-grid'>
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