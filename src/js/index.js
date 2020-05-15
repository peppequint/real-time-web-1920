console.log('index.js');
const socket = io();

const usernameSpotify = document.querySelector('.aside__username');
const users = document.querySelector('.aside__users');

const searchForm = document.querySelector('.search__form');
const searchInput = document.getElementById('search__input-song');
const searchButton = document.querySelector('.search__button');

const searchResults = document.querySelector('.search__results');

const votingSection = document.querySelector('.voting');
const votingList = document.querySelector('.voting__list');
const votingContainer = document.querySelectorAll('.voting__container');

const messageVoting = document.getElementById('voting__form');
const messageInput = document.querySelector('.voting__message');

const upVote = document.querySelectorAll('.voting__up');
const downVote = document.querySelectorAll('.voting__down');

const rankingList = document.querySelector('.ranking__list');

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit('join room', { username, room });

socket.on('server message', (message) => {
  const li = document.createElement('li');

  const bot = `<i class="bot__icon">🤖 :</i>`;

  li.classList.add('voting__item');
  li.innerHTML = `${bot}${message}`;

  votingList.append(li);
});

socket.on('vote message', (data) => {
  const liVote = document.createElement('li');
  const liRanking = document.createElement('li');

  const rating = `<span class="ranking__number"></span>`;

  const bot = `<i class="bot__icon">📻 :</i>`;

  const vote = `<div class="voting__container"><button id="voting__up" class="voting__btn voting__up" onclick="upVoteTrack(this); this.onclick=null;">👍🏼</button> or <button id="voting__down" class="voting__btn voting__down" onclick="downVoteTrack(this); this.onclick=null;">👎🏼</button></div>`;

  liVote.classList.add('voting__item');
  liVote.setAttribute('data-id', data.id);
  liVote.innerHTML = `${bot}<span class="voting__track">${data.title}</span> - <span class="voting__artist">${data.artist}</span> ${vote}`;

  votingList.append(liVote);

  liRanking.classList.add('ranking__item');
  liRanking.setAttribute('data-id', data.id);
  liRanking.innerHTML = `<p class="ranking__track">${data.title}</p><p class="ranking__artist">${data.artist}</p> ${rating}`;

  rankingList.append(liRanking);
});

socket.on('chat message', (data) => {
  console.log(data);

  const li = document.createElement('li');

  const user = `<i class="bot__icon">${data.username} 🎶 :</i>`;

  li.classList.add('voting__item');
  li.innerHTML = `${user}${data.message}`;

  votingList.append(li);

  votingList.scrollTop = votingList.scrollHeight;
});

socket.on('user message', (message) => {
  const li = document.createElement('li');

  const user = `<i class="bot__icon">You 🎵 :</i>`;

  li.classList.add('voting__item');
  li.innerHTML = `${user}${message}`;

  votingList.append(li);

  votingList.scrollTop = votingList.scrollHeight;
});

socket.on('upvote counter', (action) => {
  for (let [key, value] of Object.entries(action)) {
    let rankingItem = document.querySelector(`.ranking__item[data-id='${key}']`);
    let rankingItemNumber = document.querySelector(`.ranking__item[data-id='${key}'] .ranking__number`);

    rankingItem.setAttribute('data-value', value);
    rankingItemNumber.innerHTML = value;
  }
});

socket.on('downvote counter', (action) => {
  for (let [key, value] of Object.entries(action)) {
    let rankingItem = document.querySelector(`.ranking__item[data-id='${key}']`);
    let rankingItemNumber = document.querySelector(`.ranking__item[data-id='${key}'] .ranking__number`);

    rankingItem.setAttribute('data-value', value);
    rankingItemNumber.innerHTML = value;
  }
});

if (document.body.contains(searchInput)) {
  searchInput.addEventListener('input', (e) => {
    e.preventDefault();

    const query = e.target.value;
    const url = searchForm.getAttribute('action');

    fetch(`${url}?query=${query}&async=true`)
      .then((res) => res.text())
      .then((html) => (searchResults.innerHTML = html));
  });
}

if (document.body.contains(messageVoting)) {
  messageVoting.addEventListener('submit', function (e) {
    e.preventDefault();
    socket.emit('chat message', messageInput.value);
    messageInput.value = '';
    return false;
  });
}

if (document.body.contains(usernameSpotify)) {
  socket.emit('new user', usernameSpotify.textContent);
}

if (document.body.contains(users)) {
  socket.on('users list', (list) => {
    console.log('Users list: ', list);
  });
}

function addTrack(el) {
  const item = el.closest('.track__item');
  const title = item.querySelector('.track__name').textContent;
  const artist = item.querySelector('.track__artist').textContent;
  const id = item.getAttribute('data-id');

  const track = {
    id: id,
    title: title,
    artist: artist,
  };

  console.log(track);
  socket.emit('clicked song', track);
  searchResults.innerHTML = '';
}

function upVoteTrack(el) {
  const item = el.closest('.voting__item');
  const id = item.getAttribute('data-id');

  socket.emit('upvote', { action: 'Upvote track', id: id });
}

function downVoteTrack(el) {
  const item = el.closest('.voting__item');
  const id = item.getAttribute('data-id');

  socket.emit('downvote', { action: 'Downvote track', id: id });
}
