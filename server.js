require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// imports ==============
const errorHandler = require("./middlewares/error_handler");
const stationsRouter = require("./routes/stations_router");
const ownersRouter = require("./routes/owners_router");
const statsRouter = require("./routes/stats_router");

// middlewares ===============
app.use(express.static("client"));
app.use(express.json()); // req body parser in JSON
app.set("view engine", "ejs");

// routes ===============

app.use("/api/stations", stationsRouter);
app.use("/api/owners", ownersRouter);
app.use("/api/stats", statsRouter);

// error handler ==============
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
