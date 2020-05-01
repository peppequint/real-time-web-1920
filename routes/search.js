const fetch = require('node-fetch');

async function search(req, res) {
  const token = req.cookies.access_token;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const getSongs = await fetch(`https://api.spotify.com/v1/search?q=${req.query.query}&type=track`, {
      headers: {
        Accept: headers.Accept,
        'Content-Type': headers['Content-Type'],
        Authorization: headers.Authorization,
      },
    });

    const data = await getSongs.json();
    const getTracks = data.tracks.items;

    const tracks = getTracks.map((item) => {
      const track = {
        title: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        id: item.id,
      };

      return track;
    });

    if (req.query.async) {
      return res.render('partials/search-results', { data: tracks });
    } else {
      return res.render('pages/room');
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = search;
