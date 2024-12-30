const express = require("express");
const messages = require("../dataStore");
const router = express.Router();

router.get("/", (req, res) => res.render("index", { title: "Mini Messageboard", messages: messages }));

module.exports = router;
