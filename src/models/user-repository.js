const { users } = require('./db');

exports.getUsers = function() {
  return users;
}

exports.getUserById = function(id) {
  return users.find((user) => id == user.id);
}

exports.createUser = function(data) {
  users.push(data);
}
