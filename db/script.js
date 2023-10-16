require("dotenv").config();
const fs = require("fs");

const db = require("./index");

const csvFilePath = "./db/stations.csv";

const csvData = fs.readFileSync(csvFilePath, "utf-8");
const csvRows = csvData.split("\n");

csvRows.slice(1).forEach((row) => {
  const sql = `
  INSERT INTO petrol_stations (name, owner, address, suburb, state, lat, lng)
  VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  db.query(sql, row.split(","));
});
