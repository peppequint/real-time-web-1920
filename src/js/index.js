console.log('index.js');
const socket = io();

const username = document.querySelector('.aside__username');
const users = document.querySelector('.aside__users');

const searchForm = document.querySelector('.search__form');
const searchInput = document.getElementById('search__input-song');
const searchButton = document.querySelector('.search__button');

const roomSection = document.querySelector('.results');

const results = document.querySelector('.results');

socket.on('server message', (message) => {
  console.log(`server message: ${message}`);
});

if (document.body.contains(results)) {
  results.addEventListener('click', (e) => {
    if (e.target.classList.contains('track__item')) {
      const id = e.target.getAttribute('data-id');
      socket.emit('clicked song', id);
    }
  });
}

if (document.body.contains(searchInput)) {
  searchInput.addEventListener('input', (e) => {
    e.preventDefault();

    const query = e.target.value;
    const url = searchForm.getAttribute('action');
    // history.replaceState({}, '', `/search?query=${query}`);

    fetch(`${url}?query=${query}&async=true`)
      .then((res) => res.text())
      .then((html) => (roomSection.innerHTML = html));
  });
}

if (document.body.contains(username)) {
  socket.emit('new user', username.textContent);
}

if (document.body.contains(users)) {
  socket.on('users list', (list) => {
    console.log('Users list: ', list);
  });
}
