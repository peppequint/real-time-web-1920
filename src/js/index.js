console.log('index.js');
const socket = io();

const username = document.querySelector('.header__username').textContent;

socket.on('server message', (message) => {
  console.log(`server message: ${message}`);
});

socket.on('message', (message) => {
  console.log(message);
});

socket.emit('user', username);
