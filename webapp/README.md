# NextJS web application

## Overview

This folder contains the NextJS server, which is our website.

## Structure

This is the structure of the folder:

`src` contains all of the code we developed. This is the main folder in which all of the code for the pages, 
components, and API-related scripts is located.

`public` is the folder with all of our static assets. It can contain images, html files, logos, etc.

There are a lot of files in the root folder (`webapp`). They are all configuration files; they contain, as instance, the list of the
packages required to run the application.

## Prerequisites

[NodeJS](https://nodejs.org/en) must be installed on your computer

## Server setup

Install the dependencies of the project with `npm i`.  

Then, create a file named `.env` in the root folder of the webapp. The structure must be the following:

```
NEXT_PUBLIC_DJANGO_API_ROOT="localhost:8000"

SESSION_SECRET_PASSWORD = "randomly generated 64 characters"

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "API key from Google Maps"
```

The SESSION_SECRET_PASSWORD can be generated with the python script ``keys.py`` located in ``backend/encryption``.

## Launching the server

You can start the server with `npm start` after running `npm run build`.
Alternatively, you can start the server with `npm run dev`.
