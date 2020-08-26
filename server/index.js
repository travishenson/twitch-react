const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Serve static React files
app.use(express.static(path.join(__dirname, '../public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
};

// Twitch API setup and routes
const helixGet = async (endpoint) => {
  const twitchAuthUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;

  const tokenReq = await axios.post(twitchAuthUrl);
  const accessToken = tokenReq.data.access_token;

  try {
    const reqData = await axios.get('https://api.twitch.tv/helix' + endpoint, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': 'Bearer ' + accessToken
      }
    });

    return reqData.data.data;
  } catch (err) {
    console.log(err);
  }
}

app.get('/api/twitch/topgames', async (req, res) => {
  try {
    const topGames = await helixGet('/games/top');
    res.send({ topGames });
  } catch (err) {
    console.log(err.message)
  }
})

app.get('/api/twitch/games/:id', async (req, res) => {
  try {
    const gameData = await helixGet(`/games?id=${req.params.id}`);
    res.send({ gameData });
  } catch (err) {
    console.log(err)
  }
})

app.get('/api/twitch/topstreams', async (req, res) => {
  try {
    const streamsData = await helixGet('/streams?first=5&language=en');
    res.send({ streamsData });
  } catch (err) {
    console.log(err)
  }
})

app.get('/api/twitch/streams/:gameid', async (req, res) => {
  try {
    const streamsData = await helixGet(`/streams?game_id=${req.params.gameid}`);
    res.send({ streamsData });  
  } catch (err) {
    console.log(err)
  }
})

app.get('/api/twitch/users/:userid', async (req, res) => {
  try {
    const userData = await helixGet(`/users?id=${req.params.userid}`);
    res.send({ userData });
  } catch (err) {
    console.log(err)
  }
})

app.get('/api/twitch/tags/:tagid', async (req, res) => {
  try {
    const tagData = await helixGet(`/tags/streams?tag_id=${req.params.tagid}`);
    const tagStreams = await helixGet(`/streams`);
    let tagGames;

    await axios({
      url: 'https://api-v3.igdb.com/games/',
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'user-key': process.env.IGDB_API_KEY
      },
      data: `fields 
        genres.*, 
        name, 
        slug;
        where genres = 5;
        `
    })
    .then(response => {
      tagGames = response.data;
      return tagGames;
    })
    .catch(err => console.log(err))

    res.send({ tagData: tagData, games: tagStreams, test: tagGames });
  } catch (err) {
    console.log(err)
  }
})

// IGDB API setup and routes
app.get('/api/igdb/games/:gameslug', (req, res) => {
  axios({
    url: 'https://api-v3.igdb.com/games',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
    },
    data: `fields 
      aggregated_rating,
      aggregated_rating_count,
      first_release_date,
      game_modes.*,
      genres.*,
      involved_companies.*,
      name,
      platforms.*,
      rating,
      rating_count,
      release_dates.*,
      screenshots.*,
      summary,
      themes.*,
      total_rating,
      total_rating_count,
      url; 
      where slug = "${req.params.gameslug}";`
  })
    .then(response => {
      res.send({
        igdbData: response.data[0],
        headerImageId: response.data[0].screenshots[1].image_id
      });
    })
    .catch(err => {
        console.error(err);
    });
})

// Default route to try and fix routing error
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), 
  function (err) {
    res.status(500).send(err)
  })
})

app.listen(port, () => {
  console.log(`Server now listening on Port ${port}...`);
});
