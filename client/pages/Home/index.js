import React, { useEffect } from 'react';
import axios from 'axios';

function Home() {
  useEffect(() => {
    fetchTest();
  }, [])

  let fetchTest = () => {
    axios.get('/api/topgames')
      .then((response) => {
        console.log(response.data.topGames)
      })
    axios.get('/api/test')
      .then((response) => {
        console.log(response.data)
      })
  }

  return (
    <div className='home'>
      <h1>Welcome to TwitchReact</h1>
      <p>Here is a paragraph. Adding to the paragraph...</p>
    </div>
  )
}

export default Home;