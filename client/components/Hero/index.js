import React from 'react';
import './style.scss';

function Hero() {
  return (
    <div className='hero'>
      <div className='heroContent'>
        <h1>Welcome to TwitchReact!</h1>
        <p>TwitchReact is a Twitch-centered client that is built using the Twitch and Internet Games Database APIs.</p>
        <p>Currently, it has the functionality to browse the top-streamed games on Twitch, view IGDB-sourced information on those games, and watch the top streams of each game.</p>
      </div>
    </div>
  )
}

export default Hero;