const { trimStr } = require("./utils");

let users = {};
/*
id => {name, keyPart, operatorId, socket}
 */

let currentUserId = 0;

const findUserById = (id) => {
  return users.id;
};

const addUser = (name, keyPart, socket) => {
  currentUserId++;
  users.currentUserId = {name, keyPart, socket, operatorId: 0};
  return currentUserId;
};


const removeUser = (id) => {
  delete users.id;
};

module.exports = { addUser, findUserById, removeUser };
