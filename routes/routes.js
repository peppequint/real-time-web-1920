const express = require('express');
const app = express();

const index = require('./../controllers/index');

app.get('/', index);

module.exports = app;
