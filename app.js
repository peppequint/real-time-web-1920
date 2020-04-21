require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./routes/routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/static')));

app.use(cookieParser());

app.use(routes);

// socket setup
io.on('connection', (socket) => {
  console.log('handshake made.');

  // send to the single user that's connecting
  socket.emit('server message', 'handshake made.');

  // send to anybody except the user connecting
  socket.broadcast.emit('message', 'a  music lover is connected.');

  // runs when client disconnects
  socket.on('disconnect', () => {
    // send to every connected user
    io.emit('message', 'a music lover left the application.')
  })
});

http.listen(port, () => {
  console.log(`Real time application running on port ${port}`);
});
