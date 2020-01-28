import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';

import GameCard from '../../components/GameCard';

function Home() {
  const [topGames, setTopGames] = useState([]);

  useEffect(() => {
    let mounted = true;
    
    const fetchTopGames = () => {
      axios.get('/api/twitch/topgames')
        .then((response) => {
          if (mounted) {
            setTopGames(response.data.topGames);
          }
        })
        .catch((err) => console.log('Error: ' + err))
    }
    fetchTopGames();

    return () => {
      mounted = false;
    }
  }, [])

  return (
    <div className='home'>
      <h1>Welcome to TwitchReact</h1>
      <h2>Here are the top games being streamed on Twitch right now.</h2>
      <div className='topGames'>
        {topGames.map((game) => (
          <GameCard
            name={game.name}
            boxArt={game.box_art_url}
            key={game.id}
            id={game.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Home;