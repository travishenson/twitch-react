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
const helixRequest = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: { 'Client-ID': process.env.TWITCH_API_KEY }
});

app.get('/api/twitch/topgames', (req, res) => {
  helixRequest.get('/games/top')
    .then((response) => {
      res.send({ topGames: response.data.data })
    })
})

app.get('/api/twitch/games/:id', (req, res) => {
  helixRequest.get(`/games?id=${req.params.id}`)
    .then((response) => {
      res.send({ gameData: response.data.data })
    })
})

app.get('/api/twitch/streams/:gameid', (req, res) => {
  helixRequest.get(`/streams?game_id=${req.params.gameid}`)
    .then((response) => {
      res.send({ streamsData: response.data.data})
    })
})

app.get('/api/twitch/users/:userid', (req, res) => {
  helixRequest.get(`/users?id=${req.params.userid}`)
    .then((response) => {
      res.send({ userData: response.data.data })
    })
})

// IGDB API setup and routes
app.get('/api/igdb/games/:gamename', (req, res) => {
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
      where name = "${req.params.gamename}";`
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
