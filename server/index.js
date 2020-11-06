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

// API setup and routes
const igdbGet = async (endpoint) => {
  const twitchAuthUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;

  const tokenReq = await axios.post(twitchAuthUrl);
  const accessToken = tokenReq.data.access_token;
  
  axios({
    url: `https://api.igdb.com/v4/${endpoint}`,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': 'Bearer ' + accessToken
    },
    data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
  })
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    });
}

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

    const tagGames = await igdbGet('/games');

    res.send({ tagData: tagData, games: tagStreams, test: tagGames });
  } catch (err) {
    console.log(err)
  }
})

// IGDB API setup and routes
app.get('/api/igdb/games/:gameslug', async (req, res) => {
  const twitchAuthUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;

  const tokenReq = await axios.post(twitchAuthUrl);
  const accessToken = tokenReq.data.access_token;

  axios({
    url: `https://api.igdb.com/v4/games`,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      'Authorization': 'Bearer ' + accessToken
    },
    data: `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres.*,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms.*,player_perspectives,rating,rating_count,release_dates,screenshots.*,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes.*,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; where slug = "${req.params.gameslug}";`
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
