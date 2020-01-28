import React from 'react';
import './style.scss';

function Hero() {
  return (
    <div className='hero'>
      <div className='heroContent'>
        <h1>Welcome to TwitchReact!</h1>
        <p>TwitchReact is a Twitch client that is built using the Twitch API and the Internet Games Database API.</p>
        <p>It is currently under construction with limited functionality, but feel free to look around.</p>
      </div>
    </div>
  )
}

export default Hero;