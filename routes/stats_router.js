const express = require("express");
const router = express.Router();
const Stats = require("../model/stats.js");

// group decided against adding 'all' to route

router.get("/", (req, res) => {
  Stats.getStats().then((stats) => {
    let data = {
      owners: stats.slice(0, 7),
      total_owners: stats.length,
      total_stations: stats
        .map((owner) => Number(owner.total))
        .reduce((curr, accum) => curr + accum, 0),
    };

    return res.json(data);
  });
});

module.exports = router;
