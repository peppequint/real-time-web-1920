const { app } = require('./../server');

const index = require('./index');
const login = require('./login');
const dashboard = require('./dashboard');
const room = require('./room');

// middleware
const callback = require('./../middleware/callback');

app.get('/', index);
app.get('/login', login);
app.get('/dashboard', dashboard);

// middleware route
app.get('/callback', callback);

// detailed room
app.get('/:room', room);


