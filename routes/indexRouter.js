const express = require("express");
const messagesController = require("../controllers/messagesController");
const router = express.Router();

router.get("/", messagesController.messagesGetAll);
router.post("/send", messagesController.messagesNewPost);

module.exports = router;
