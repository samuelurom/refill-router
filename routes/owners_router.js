const express = require("express");
const router = express.Router();
const Owner = require("../model/owner.js");

router.get("/", (req, res) => {
  Owner.findAll().then((owners) => res.json(owners));
});

module.exports = router;
