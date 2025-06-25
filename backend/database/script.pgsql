CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL,
    email_hash TEXT NOT NULL,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    password TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    UNIQUE (email),
    UNIQUE (email_hash)
);

CREATE TABLE IF NOT EXISTS auth_tokens (
    token TEXT,
    id_user INT NOT NULL,
    expiration TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE,
    PRIMARY KEY (token)
);

CREATE TABLE IF NOT EXISTS email_tokens (
    token TEXT,
    id_user INT NOT NULL,
    expiration TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE,
    PRIMARY KEY (token)
);

CREATE TABLE IF NOT EXISTS locations (
    id_location SERIAL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    UNIQUE (latitude, longitude),
    PRIMARY KEY (id_location)
);

CREATE TABLE IF NOT EXISTS stations (
    id_station SERIAL,
    name TEXT NOT NULL,
    id_location INT NOT NULL,
    capacity INT NOT NULL,
    station_code INT NOT NULL,
    FOREIGN KEY (id_location) REFERENCES locations(id_location) ON DELETE CASCADE,
    PRIMARY KEY (id_station)
);

CREATE TABLE IF NOT EXISTS bikes (
    id_station INT REFERENCES stations(id_station) ON DELETE CASCADE,
    nb_electric INT NOT NULL,
    nb_mechanic INT NOT NULL,
    PRIMARY KEY (id_station)
);

CREATE TABLE IF NOT EXISTS rents (
    id_rent SERIAL,
    id_user INT NOT NULL,
    id_station INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_station) REFERENCES stations(id_station) ON DELETE CASCADE,
    PRIMARY KEY (id_rent)
);

CREATE TABLE IF NOT EXISTS favorites (
    id_user INT NOT NULL,
    id_station INT NOT NULL,
    PRIMARY KEY (id_user, station_code),
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (station_code) REFERENCES stations(station_code) ON DELETE CASCADE
);
