const express = require("express");
const messages = require("../dataStore");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(404).send("Both message text and user name are required");
  }

  messages.push({ text: message, user: name, added: new Date().toLocaleTimeString() });

  res.redirect("/");
});

module.exports = router;
