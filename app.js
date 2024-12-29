require("dotenv").config();

const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");

const app = express();
const port = process.env.PORT || 3000;

// App middleware set up
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Routes
app.use("/", indexRouter);

// Server start
app.listen(port, () => {
  console.log(`Server listening on ${port}..`);
});
