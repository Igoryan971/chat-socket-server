const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();

const route = require("./route");
const { addUser, findUser, getRoomUsers, removeUser } = require("./users");
const { initRooms, clientJoinRoom, operatorJoinRoom, listRoomsForClient, listRoomsForOperator } = require("./rooms");
const {logWithTime} = require("./utils");

app.use(cors({ origin: "*" }));
app.use(route);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

initRooms();

io.on("connection", (socket) => {
  socket.on("join", ({ name, room, role }) => {
    //role - (client, operator)

    logWithTime('подключение: ', { name, room, role })
    socket.join(room);
    const { user, isExist } = addUser({ name, room });

    if ('client' === role) {
      clientJoinRoom(name, Number(room));
      socket.emit("message", {
        data: { user: { name: "Info" }, message: `${user.name}, ждем Вашего вопроса.` },
      });

      socket.broadcast.to(user.room).emit("message", {
        data: {
          user: { name: "Info" },
          message: `Оператор ${user.name} присоединился к Вашему диалогу.`,
        },
      });
    } else if ('operator' === role) {
      operatorJoinRoom(name, Number(room));
      socket.emit("message", {
        data: { user: { name: "Info" }, message: `${user.name}, вы начали общение с клиентом.` },
      });

      socket.broadcast.to(user.room).emit("message", {
        data: {
          user: { name: "Info" },
          message: `Оператор ${user.name} присоединился к Вашему диалогу.`,
        },
      });
    } else {
      logWithTime('не известная роль присоединившегося');
      return;
    }

/*    const userMessage = isExist
      ? `${user.name}, вернулся`
      : `Привет ${user.name}`;*/

    io.to(user.room).emit("room", {
      data: { users: getRoomUsers(user.room) },
    });
  });

  socket.on("sendMessage", ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      io.to(user.room).emit("message", { data: { user, message } });
    }
  });

  socket.on("leftRoom", ({ params }) => {
    const user = removeUser(params);

    if (user) {
      const { room, name } = user;

      io.to(room).emit("message", {
        data: { user: { name: "Admin" }, message: `${name} покинул чат` },
      });

      io.to(room).emit("room", {
        data: { users: getRoomUsers(room) },
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
