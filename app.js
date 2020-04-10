require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const path = require('path');

const routes = require('./routes/routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/static')));
app.use(routes);

io.on('connection', (socket) => {
  let username = 'test-user';
  let encrypted = false;

  console.log(`${username} is connected!`);
  socket.emit('server message', `${username}, you are connected.`);
  socket.broadcast.emit('server message', `${username} is in the room!`);

  socket.on('username', (name) => {
    username = name;

    console.log(username);
    io.emit('server message', `${username} is in the room!`);
  });

  socket.on('encrypted', (username) => {
    console.log(`${username} encrypted the chat!`);
    encrypted = true;
    console.log(encrypted);
    socket.emit('server message', `You have encrypted the messages!`);
    socket.broadcast.emit('server message', `${username} has encrypted the messages!`);
    return encrypted;
  });

  socket.on('chat', (message) => {
    if (encrypted === true) {
      encryptedMessage(message);
      console.log('It is encrypted!');
      io.emit('server message', `You have encrypted the messages!`);
      socket.broadcast.emit('server message', `You can't see the messages!`);
    } else if (encrypted === false) {
      console.log(message);
      io.emit('chat', `${username}: ${message}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`${username} is disconnected!`);
    io.emit('server message', `${username} left the room!`);
  });
});

function encryptedMessage(message) {
  // iets doen met de berichten, api?
  console.log('Dit is de encrypted: ', message);

  return message;
}

http.listen(port, () => {
  console.log(`Real time application running on port ${port}`);
});
