require("dotenv").config();

const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const newMsgRouter = require("./routes/newMsgRouter");

const app = express();
const port = process.env.PORT || 3000;

// App middleware set up
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Routes
app.use("/", indexRouter);
app.use("/new", newMsgRouter);

// 404 Middleware
app.use((req, res, next) => res.status(404).send("Page not found"));

// Error handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

// Server start
app.listen(port, () => {
  console.log(`Server listening on ${port}..`);
});
