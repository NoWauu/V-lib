### 3rd & 4th semester project : Development of a multi-platform application to manage and rent Vélib' stations

## Overview

V-lib is a full-stack application, available on all platforms.

It includes a lot of features, and allows you to:
* Look for Vélib' stations close to you in real time
* View all the information of station
* Book a bike in a specific station
* Obtain a route to follow to go to the station you have selected
* Access the history of all the stations you visited and the times you booked a bike

## Stack

V-lib has been created with a modern and efficient stack: it is primarily powered by Next.js, Django, PostgreSQL and Flutter.

The application relies on the REST API to access data and interact with the database.

JSON is central to the application, as all API responses are formatted using it.

## Structure of the project

The project is split into 5 folders:

`.github` contains the Continuous Integration workflow

`backend` contains the backend server, with the API that interacts with the database and serves data to the web server. 

`phone_app` contains the mobile application made with Flutter.

`Ressources` contains all the diagrams made for the application.

`webapp` contains the frontend server that users will interact with.

## Installation and startup

To configure and run the application, you must follow the guides included in the `README.md` files located in the `backend`, `webapp` and `phone_app` folders.
