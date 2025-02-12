DROP TABLE IF EXISTS bikes CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS rents CASCADE;
DROP TABLE IF EXISTS stations CASCADE;
DROP TABLE IF EXISTS auth_tokens CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL,
    email_hash TEXT NOT NULL,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    password TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    favorites INTEGER ARRAY,
    UNIQUE (email),
    UNIQUE (email_hash)
);

CREATE TABLE auth_tokens (
    token TEXT,
    id_user INT NOT NULL,
    expiration TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE,
    PRIMARY KEY (token)
);

CREATE TABLE locations (
    id_location SERIAL PRIMARY KEY,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    UNIQUE (latitude, longitude)
);

CREATE TABLE stations (
    id_station SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    id_location INT NOT NULL,
    capacity INT NOT NULL,
    station_code INT NOT NULL,
    FOREIGN KEY (id_location) REFERENCES locations(id_location) ON DELETE CASCADE
);

CREATE TABLE bikes (
    id_station INT REFERENCES stations(id_station) ON DELETE CASCADE,
    nb_electric INT NOT NULL,
    nb_mechanic INT NOT NULL,
    PRIMARY KEY (id_station)
);

CREATE TABLE rents (
    id_rent SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    id_station INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_station) REFERENCES stations(id_station) ON DELETE CASCADE
);
