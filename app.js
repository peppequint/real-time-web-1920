require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const path = require('path');

const routes = require('./routes/routes');

// const sockets = require('./controllers/socket');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/static')));
app.use(routes);

io.on('connection', (socket) => {
  console.log('An user is connected!');
  socket.on('chat', (message) => {
    console.log(message);
    io.emit('chat', message);
  });
});

http.listen(port, () => {
  console.log(`Real time application running on port ${port}`);
});
