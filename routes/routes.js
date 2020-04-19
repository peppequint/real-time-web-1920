const express = require('express');
const app = express();

const index = require('./index');
const login = require('./login');
const rooms = require('./rooms');

// middleware
const callback = require('./../middleware/callback');

app.get('/', index);
app.get('/login', login);
app.get('/rooms', rooms);

// middleware route
app.get('/callback', callback);

module.exports = app;
