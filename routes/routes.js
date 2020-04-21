const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const index = require('./index');
const login = require('./login');
const dashboard = require('./dashboard');

// middleware
const callback = require('./../middleware/callback');

app.get('/', index);
app.get('/login', login);
app.get('/dashboard', dashboard);

// middleware route
app.get('/callback', callback);

app.get('/:room', (req, res) => {
  res.render('pages/room');
});

module.exports = app;
