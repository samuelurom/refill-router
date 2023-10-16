const db = require("../db");

function findAll() {
  const sql = `
    SELECT DISTINCT owner
    FROM petrol_stations;
   `;

  return db.query(sql).then((result) => {
    return result.rows;
  });
}

module.exports = {
  findAll,
};
