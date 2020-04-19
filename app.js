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

http.listen(port, () => {
  console.log(`Real time application running on port ${port}`);
});
