const fetch = require('node-fetch');

let genres = ['deep house', 'tech house', 'uk house', 'chicago house', 'detroit house', 'disco', 'techno', 'minimal'];

async function rooms(req, res) {
  const token = req.cookies.access_token;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const getProfile = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Accept: headers.Accept,
        'Content-Type': headers['Content-Type'],
        Authorization: headers.Authorization,
      },
    });

    const data = await getProfile.json();

    const profileObject = {
      name: data.display_name,
      img: data.images[0] ? data.images[0].url : `https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png`,
      id: data.id,
    };

    res.render('pages/dashboard', { data: profileObject, genres: genres });
  } catch (error) {
    console.error(error);
  }
}

module.exports = rooms;
