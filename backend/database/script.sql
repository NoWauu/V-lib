DROP TABLE IF EXISTS bikes;
DROP TABLE IF EXISTS stations;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS location;

CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL,
    user_password TEXT NOT NULL,
    phone TEXT NOT NULL
);

CREATE TABLE location (
    id_location SERIAL PRIMARY KEY,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

CREATE TABLE stations (
    id_station SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location_id INT NOT NULL,
    FOREIGN KEY (location_id) REFERENCES location(id_location)
);

CREATE TABLE bikes (
    id_station INT REFERENCES stations(id_station),
    nb_electric INT NOT NULL,
    nb_mechanic INT NOT NULL,
    PRIMARY KEY (id_station)
);
