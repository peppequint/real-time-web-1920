const fetch = require('node-fetch');

let genres = ['deep-house', 'techno', 'hardstyle'];

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

    // const getTrack = await fetch('https://api.spotify.com/v1/tracks/49VM3vCQBFr1wJJw7xByGf', {
    //   headers: {
    //     Accept: headers.Accept,
    //     'Content-Type': headers['Content-Type'],
    //     Authorization: headers.Authorization,
    //   },
    // });

    // const track = await getTrack.json();
    // console.log(track);

    const data = await getProfile.json();

    res.render('pages/dashboard', { data: data, genres: genres });
  } catch (error) {
    console.error(error);
  }
}

module.exports = rooms;
