const fetch = require('node-fetch');

async function rooms(req, res) {
  const token = req.cookies.access_token;
  console.log(token);
  
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const getProfile = await fetch('https://api.spotify.com/v1/me', headers);
    const data = await getProfile.json();
    console.log(data);

    res.send(data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = rooms;
