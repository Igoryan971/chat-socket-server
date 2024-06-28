const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();

const route = require("./route");
const { addUser, findUser, getRoomUsers, removeUser, findUserById} = require("./users");
const {logWithTime} = require("./utils");
const {addOperator} = require("./operators");

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  let operatorId = 0;

  socket.on("joinUser", ({ name, keyPart }) => {
    console.log('joinUser', name, keyPart);

    const userId = addUser( name, keyPart, socket);
    operatorId = 1;

    logWithTime('подключился пользователь', userId);
    socket.emit("message", {
      data: { user: { name: "Info" }, message: "Добро пожаловать!" },
    });

  });

  socket.on("joinOperator", ({ name}) => {
    console.log('joinUser', name, keyPart);

    const operatorId = addOperator( name, keyPart, socket);
    logWithTime('подключился оператор', operatorId);

    socket.emit("message", {
      data: { user: { name: "Info" }, message: "Добро пожаловать! Ваш номер" + operatorId},
    });

  });


  socket.on("sendMessageOperatorToUser", ({ message, id }) => {
    console.log('sendMessageOperatorToUser', message, id)
    const user = findUserById(id);

    if (user) {
      user.socket.emit("message", {
        data: { user: { name: "Operator" }, message: message },
      });
    }
  });


  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(5000, () => {
  console.log("Server is running");
});
