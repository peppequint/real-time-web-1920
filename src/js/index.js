console.log('index.js');

const socket = io();

const sendUsername = document.querySelector('form.username-form');
const sendMessage = document.querySelector('form.message-form');
const username = document.querySelector('#username');
const message = document.querySelector('#message');
const messages = document.querySelector('.message-list');

sendUsername.addEventListener('submit', (evnet) => {
  event.preventDefault();

  socket.emit('username', username.value);
  return false;
});

sendMessage.addEventListener('submit', (event) => {
  event.preventDefault();

  if ((message.value === '/encrypted')) {
    console.log('henkie werkt');
    socket.emit('encrypted', username.value)
    message.value = '';
  } else {
    socket.emit('chat', message.value);
    message.value = '';
  }

  return false;
});

socket.on('chat', (message) => {
  const li = document.createElement('li');
  li.append(message);
  messages.append(li);
});

socket.on('server message', (message) => {
  const li = document.createElement('li');
  li.classList.add('server-message');
  li.append(message);
  messages.append(li);
});
