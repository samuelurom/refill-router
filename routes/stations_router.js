const express = require("express");
const router = express.Router();
const Station = require("../model/station.js");

// group decided against adding 'all' to route

router.get("/all", (req, res) => {
  Station.findAll().then((stations) => {
    return res.json(stations);
  });
});

router.get("/bounds", (req, res) => {
  const { swLat, neLat, swLng, neLng } = req.query;

  Station.findByBounds(swLat, neLat, swLng, neLng).then((stations) => {
    return res.json(stations);
  });
});

module.exports = router;
