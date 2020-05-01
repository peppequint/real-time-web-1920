const { io } = require('../server');

let users = [];

// socket setup
io.on('connection', (socket) => {
  console.log(`socket created.`);

  let username = 'username';
  // send to the single user that's connecting
  socket.emit('server message', 'new handshake made.');

  socket.on('new user', (id) => {
    users.push(id);

    username = id;

    console.log(`${username} connected.`);

    socket.emit('server message', `${username} has entered the application.`);

    socket.emit('users list', users);
  });

  socket.on('clicked song', (id) => {
    console.log(id);
    socket.broadcast.emit('server message', `${id} has added to playlist`);
  });

  // disconnection
  socket.on('disconnect', (username) => {
    console.log(username);

    console.log(`${username} has left the app.`);

    console.log('users: ', users);

    socket.broadcast.emit('server message', `${username} has left the application.`);
  });
});
