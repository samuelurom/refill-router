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

module.exports = {
  findAll,
};
