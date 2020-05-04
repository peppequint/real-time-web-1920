const { io } = require('../server');
const userJoin = require('./../controllers/users');

// socket setup
io.on('connection', (socket) => {
  socket.on('join room', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    console.log(user.room);

    socket.on('clicked song', (id) => {
      const title = id.title;
      const artist = id.artist;

      socket.emit('server message', `You added ${title} to the vote list.`);
      io.in(user.room).emit('vote message', { title, artist });
    });

    socket.on('chat message', (message) => {
      console.log(message);
      socket.emit('user message', `${message}`);
      socket.broadcast.to(user.room).emit('chat message', `${message}`);
    });
  });

  // send to the single user that's connecting
  socket.emit('server message', 'Please, search a number and other users can vote!');
});
