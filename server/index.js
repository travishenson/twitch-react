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
    .then(
      (response) => { res.send({ topGames: response.data.data }) }
    )
})

app.get('/api/twitch/games/:id', (req, res) => {
  helixRequest.get(`/games?id=${req.params.id}`)
    .then(
      (response) => { res.send({ gameData: response.data.data }) }
    )
})

app.listen(port, () => {
  console.log(`Server now listening on Port ${port}...`);
});
