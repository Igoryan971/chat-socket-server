const express = require('express');
const { listRoomsForClient, listRoomsForOperator, listAllRoomsStatus } = require("./rooms");

const router = express.Router();


router.get("/", (req, res) => {
	res.send("Это только мой мир!");
});
router.get("/list_for_client/", (req, res) => {
	res.send(JSON.stringify(listRoomsForClient()));
});
router.get("/list_for_operator/", (req, res) => {
	res.send(JSON.stringify(listRoomsForOperator()));
});
router.get("/list_all_rooms/", (req, res) => {
	res.send(JSON.stringify(listAllRoomsStatus()));
});

module.exports = router;