CREATE DATABASE refill_router;

\c refill_router;

CREATE TABLE petrol_stations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  owner TEXT NOT NULL,
  address TEXT NOT NULL,
  suburb TEXT NOT NULL,
  state TEXT NOT NULL,
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL
);