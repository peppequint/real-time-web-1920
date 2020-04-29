const { socket } = require('../server');

// socket setup
socket.on('connection', (socket) => {
  console.log('handshake made.');

  // send to the single user that's connecting
  socket.emit('server message', 'new handshake made.');

  // when users connects
  socket.on('user', (username) => {
    users = username;
    // console.log(users);

    socket.broadcast.emit('message', `${username} is connected.`);

    // log says transport close left.?
    socket.on('disconnect', (username) => {
      // send to every connected user
      socketServer.emit('message', `${username} left.`);
    });
  });
});
