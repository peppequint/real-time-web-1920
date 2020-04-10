// const data = require('./../data/data.json');

async function index(req, res) {
  // for (const players in data) {
  //   return players;
  // }
  return res.render('pages/index');
}

module.exports = index;
