const express = require('express');
const app = express();
const port = process.env.PORT;

const http = require('http').Server(app);
const socket = require('socket.io')(http);

const path = require('path');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/static')));

app.use(cookieParser());

http.listen(port, () => {
  console.log(`Real time application running on port ${port}`);
});

module.exports = { app, http, socket };
