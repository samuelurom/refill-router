const db = require("../db");

function findAll() {
  const sql = `
      SELECT * 
      FROM petrol_stations
      ORDER BY id
      LIMIT 400;
      `;
  return db.query(sql).then((result) => result.rows);
}

function findByBounds(swLat, neLat, swLng, neLng) {
  const sql = `
        SELECT * FROM petrol_stations 
        WHERE lat BETWEEN $1 AND $2 
        AND lng BETWEEN $3 AND $4
    `;

  return db
    .query(sql, [swLat, neLat, swLng, neLng])
    .then((result) => result.rows);
}

function findRandom() {
  const sql = `
    SELECT * FROM petrol_stations
    ORDER BY RANDOM()
    LIMIT 1;
  `;

  return db.query(sql).then((result) => result.rows);
}

module.exports = {
  findAll,
  findByBounds,
  findRandom,
};
