const users = [];

function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

module.exports = userJoin;
