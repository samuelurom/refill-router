const db = require("../db");

function getStats() {
  const sql = `
    SELECT owner, COUNT(id) as total
    FROM petrol_stations
    GROUP BY owner
    ORDER by total DESC;
  `;

  return db.query(sql).then((result) => result.rows);
}

module.exports = { getStats };
