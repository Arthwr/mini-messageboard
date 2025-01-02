const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const formatMessage = require("../helpers/formatMessage");
const asyncHandler = require("../helpers/asyncHandler");

// Form input validation
const validateInput = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage("Username should only contain letters")
    .isLength({ min: 2, max: 70 })
    .withMessage("Username must be between 2 and 70 characters"),
  body("message").trim().isLength({ min: 1, max: 200 }).withMessage("Message must be between 1 and 200 characters"),
];

// Controller Middleware
exports.messagesGetAll = asyncHandler(async (req, res) => {
  const messages = await db.getAllMessages();
  res.locals.messages = messages;

  const formattedMessages = messages.map(formatMessage);

  res.render("index", { title: "Mini messageboard", messages: formattedMessages });
});

exports.messagesNewPost = [
  validateInput,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = await db.getAllMessages();
      const formattedMessages = messages.map(formatMessage);

      return res.status(400).render("index", {
        title: "Mini messageboard",
        errors: errors.array(),
        messages: formattedMessages,
      });
    }

    const { username, message } = req.body;

    if (!username || !message) {
      return res.status(400).send("Both username and message are required");
    }

    await db.postNewMessage(username, message);
    res.redirect("/");
  }),
];
