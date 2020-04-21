console.log('index.js');
const socket = io();

socket.on('server message', (message) => {
  console.log(`server message: ${message}`);
});

socket.on('message', (message) => {
  console.log(message);
});
