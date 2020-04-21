require('dotenv').config();

const fetch = require('node-fetch');
const queryString = require('query-string');

async function callback(req, res) {
  const code = req.query.code;
  const queryObject = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  };

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encode(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET_ID}`)}`,
    },
  };

  const query = queryString.stringify(queryObject);
  const url = `https://accounts.spotify.com/api/token?${query}`;

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    res.cookie('access_token', data.access_token);
    res.cookie('refresh_token', data.refresh_token);

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.send(error);
  }
}

function encode(text) {
  return new Buffer.from(text).toString('base64');
}

module.exports = callback;
