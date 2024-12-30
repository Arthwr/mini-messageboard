const express = require("express");
const router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date().toLocaleTimeString(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date().toLocaleTimeString(),
  },
];

router.get("/", (req, res) => res.render("index", { title: "Mini Messageboard", messages: messages }));

module.exports = router;
