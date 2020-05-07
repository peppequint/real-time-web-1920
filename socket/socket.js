const { io } = require('../server');
const userJoin = require('./../controllers/users');

let counter = 0;

// socket setup
io.on('connection', (socket) => {
  socket.on('join room', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    console.log(user.room);
    console.log(user.username);

    socket.on('clicked song', (track) => {
      // console.log(track);

      const title = track.title;
      const artist = track.artist;
      const id = track.id;
      const rating = 0;

      socket.emit('server message', `You added ${title} to the vote list.`);
      socket.to(user.room).emit('server message', `${user.username} added ${title} to the vote list.`);
      io.in(user.room).emit('vote message', { title, artist, rating, id });
      // io.in(user.room).emit('track list', { title, artist });
    });

    socket.on('chat message', (message) => {
      console.log(message);
      socket.emit('user message', `${message}`);
      socket.broadcast.to(user.room).emit('chat message', `${message}`);
    });

    socket.on('upvote', (action) => {
      console.log(action);
      counter++;
      io.emit('upvote counter', { response: counter, id: action.id });
    });

    socket.on('downvote', (action) => {
      console.log(action);
      counter--;
      io.emit('downvote counter', { response: counter, id: action.id });
    });
  });

  // send to the single user that's connecting
  socket.emit('server message', 'Please, search a number and other users can vote!');
});
