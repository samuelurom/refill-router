require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// imports ==============
const errorHandler = require("./middlewares/error_handler");

// middlewares ===============
app.use(express.static("client"));
app.use(express.json()); // req body parser in JSON

// routes ===============

// error handler ==============
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
