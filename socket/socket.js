const { io } = require('../server');
const userJoin = require('./../controllers/users');

let countVotes = {};

// socket setup
io.on('connection', (socket) => {
  socket.on('join room', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    socket.on('clicked song', (track) => {
      const title = track.title;
      const artist = track.artist;
      const id = track.id;

      socket.emit('server message', `You added ${title} to the vote list.`);
      socket.to(user.room).emit('server message', `${user.username} added ${title} to the vote list.`);
      io.in(user.room).emit('vote message', { title, artist, id });
    });

    socket.on('chat message', (message) => {
      console.log(`${user.username}: ${message}`);
      const username = user.username;
      socket.emit('user message', message);
      socket.broadcast.to(user.room).emit('chat message', { username, message });
    });

    socket.on('upvote', (action) => {
      const id = action.id;
      const room = user.room;

      if (!countVotes[room]) {
        console.log('room bestaat niet');
        const object = { [id]: 1 };
        countVotes[room] = object;
        console.log(countVotes);
      } else if (!countVotes[room][id]) {
        console.log('nummer bestaat niet');
        countVotes[room][id] = 1;
        console.log(countVotes);
      } else {
        console.log('nummer nog een keer voten');
        countVotes[room][id] += 1;
        console.log(countVotes);
      }

      io.in(user.room).emit('upvote counter', countVotes[room]);
    });

    socket.on('downvote', (action) => {
      const id = action.id;
      const room = user.room;

      if (!countVotes[room]) {
        console.log('room bestaat niet');
        const object = { [id]: -1 };
        countVotes[room] = object;
        console.log(countVotes);
      } else if (!countVotes[room][id]) {
        console.log('nummer bestaat niet');
        countVotes[room][id] = -1;
        console.log(countVotes);
      } else {
        console.log('nummer nog een keer voten');
        countVotes[room][id] -= 1;
        console.log(countVotes);
      }

      io.in(user.room).emit('downvote counter', countVotes[room]);
    });
  });

  // send to the single user that's connecting
  socket.emit('server message', 'Please, search a number and add to the chat!');
});
