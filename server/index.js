const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Serve static React files
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

// Twitch API setup and routes
const twitchAuthUrl = `https://id.twitch.tv/oauth2/token\
?client_id=${process.env.TWITCH_CLIENT_ID}\
&client_secret=${process.env.TWITCH_CLIENT_SECRET}\
&grant_type=client_credentials`;

const helixGet = async (endpoint) => {
  const tokenReq = await axios.post(twitchAuthUrl);
  const accessToken = tokenReq.data.access_token;

  const reqData = await axios.get('https://api.twitch.tv/helix' + endpoint, {
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      'Authorization': 'Bearer ' + accessToken
    }
  });

  return reqData.data.data;
}

app.get('/api/twitch/topgames', async (req, res) => {
  const topGames = await helixGet('/games/top');
  res.send({ topGames });
})

app.get('/api/twitch/games/:id', async (req, res) => {
  const gameData = await helixGet(`/games?id=${req.params.id}`);
  res.send({ gameData });
})

app.get('/api/twitch/streams/:gameid', async (req, res) => {
  const streamsData = await helixGet(`/streams?game_id=${req.params.gameid}`);
  res.send({ streamsData });
})

app.get('/api/twitch/users/:userid', async (req, res) => {
  const userData = await helixGet(`/users?id=${req.params.userid}`);
  res.send({ userData });
})

// IGDB API setup and routes
app.get('/api/igdb/games/:gameslug', (req, res) => {
  axios({
    url: "https://api-v3.igdb.com/games",
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

app.listen(port, () => {
  console.log(`Server now listening on Port ${port}...`);
});
