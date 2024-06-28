const roomsCount = 50;
let rooms = [];
/* {operatorName, clientName} */

const initRooms = () => {
    for (let i = 0; i <= roomsCount; i++) {
        rooms[i] = {operatorName: null, clientName: null};
    }
}
const clientJoinRoom = (clientName, roomId) => {
    if (rooms[roomId].clientName === null) {
        rooms[roomId].clientName = clientName;
    }
}

const operatorJoinRoom = (operatorName, roomId) => {
    if (
        rooms[roomId].operatorName === null // комната не занята оператором
        && rooms[roomId].clientName !== null // в комнате есть пользователь (не зачем брать пустую комнату)
    ) {
        rooms[roomId].operatorName = operatorName;
    }
}

const listRoomsForClient = () => {
    return rooms
        .map((room, id) => {
            if (null === room.clientName && null === room.operatorName) {
                return id;
            } else {
                return -1;
            }
        })
        .filter((roomId) => roomId >= 0)
        ;
}

const listRoomsForOperator = () => {
    return rooms
        .map((room, id) => {
            if (room.clientName !== null && room.operatorName === null) {
                return id;
            } else {
                return -1;
            }
        })
        .filter((roomId) => roomId >= 0)
        ;
}

const listAllRoomsStatus = () => {
    return rooms
        .map((room, id) => {
            return {
                roomId: id,
                withClient: room.clientName !== null,
                withOperator: room.operatorName !== null,
            }
        });
}

module.exports = {
    initRooms,
    clientJoinRoom,
    operatorJoinRoom,
    listRoomsForClient,
    listRoomsForOperator,
    listAllRoomsStatus,
};
