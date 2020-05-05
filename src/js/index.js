console.log('index.js');
const socket = io();

const usernameSpotify = document.querySelector('.aside__username');
const users = document.querySelector('.aside__users');

const searchForm = document.querySelector('.search__form');
const searchInput = document.getElementById('search__input-song');
const searchButton = document.querySelector('.search__button');

const roomSection = document.querySelector('.results');

const results = document.querySelector('.results');

const votingList = document.querySelector('.voting__list');

const messageVoting = document.getElementById('voting__form');
const messageInput = document.querySelector('.voting__message');

const upvote = document.getElementById('voting__up');
const downvote = document.getElementById('voting__down');

const rankingList = document.querySelector('.ranking__list');

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log(username, room);

socket.emit('join room', { username, room });

socket.on('server message', (message) => {
  const li = document.createElement('li');

  const bot = `<i class="bot__icon">🤖 :</i>`;

  li.classList.add('voting__item');
  li.innerHTML = `${bot}${message}`;

  votingList.append(li);
});

socket.on('vote message', (data) => {
  console.log(data);

  const liVote = document.createElement('li');
  const liRanking = document.createElement('li');

  const rating = `<span class="ranking__number">${data.rating}</span>`;

  const bot = `<i class="bot__icon">🗳️ :</i>`;

  const vote = `<div class="voting__container"><button id="voting__up" class="voting__btn">👍🏼</button> or <button id="voting__down" class="voting__btn">👎🏼</button></div>`;

  liVote.classList.add('voting__item');
  liVote.setAttribute('data-id', data.id);
  liVote.innerHTML = `${bot}<span class="voting__track">${data.title}</span> - <span class="voting__artist">${data.artist}</span> ${vote}`;

  votingList.append(liVote);

  liRanking.classList.add('ranking__item');
  liRanking.setAttribute('data-id', data.id);
  liRanking.innerHTML = `<span class="ranking__track">${data.title}</span> - <span class="ranking__artist">${data.artist}</span> ${rating}`;

  rankingList.append(liRanking);
});

socket.on('chat message', (message) => {
  const li = document.createElement('li');

  const user = `<i class="bot__icon">👂 :</i>`;

  li.classList.add('voting__item');
  li.innerHTML = `${user}${message}`;

  votingList.append(li);

  votingList.scrollTop = votingList.scrollHeight;
});

socket.on('user message', (message) => {
  const li = document.createElement('li');

  const user = `<i class="bot__icon">🗣️ :</i>`;

  li.classList.add('voting__item');
  li.innerHTML = `${user}${message}`;

  votingList.append(li);

  votingList.scrollTop = votingList.scrollHeight;
});

if (document.body.contains(results)) {
  results.addEventListener('click', (e) => {
    if (e.target.classList.contains('track__item')) {
      const trackId = e.target.getAttribute('data-id');
      const trackName = e.target.querySelector('.track__name').textContent;
      const trackArtist = e.target.querySelector('.track__artist').textContent;

      const track = {
        id: trackId,
        title: trackName,
        artist: trackArtist,
      };

      socket.emit('clicked song', track);
    }
    results.innerHTML = '';
    searchInput.value = '';
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

// substring(0, 7)

if (document.body.contains(users)) {
  socket.on('users list', (list) => {
    console.log('Users list: ', list);
  });
}
