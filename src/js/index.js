console.log('index.js');

const socket = io();

const form = document.querySelector('form');
const message = document.querySelector('#message');
const messages = document.querySelector('.message-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  socket.emit('chat', message.value);
  message.value = '';
  return false;
});

socket.on('chat', (message) => {
  const li = document.createElement('li');
  li.append(message);
  messages.append(li);
});
