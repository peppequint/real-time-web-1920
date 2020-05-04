async function room(req, res) {
  const username = req.query.username;
  const room = req.params.room;

  return res.render('pages/room', { username: username, room: room });
}

module.exports = room;
