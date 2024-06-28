const { trimStr } = require("./utils");

let operators = {};
/*
id => {name, keyPart, operatorId, socket}
 */

let currentOperatorId = 0;

const findOperatorById = (id) => {
  return operators.id;
};

const addOperator = (name, socket) => {
  currentOperatorId++;
  operators.currentOperatorId = {name, socket, userId: 0};
  return currentOperatorId;
};


const removeOperator = (id) => {
  delete operators.id;
};

module.exports = { addOperator, findOperatorById, removeOperator };
