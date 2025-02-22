# NextJS web application

## Overview

This folder contains the NextJS server, which is our website.

## Structure

TO DO

## Prerequisites

[NodeJS](https://nodejs.org/en) must be installed on your computer

## Server setup

Install the dependencies of the project with `npm i`.  

Then, create a file named `.env` in the root folder of the webapp.   The structure must be the following:

```
NEXT_PUBLIC_DJANGO_API_ROOT="localhost:8000"

SESSION_SECRET_PASSWORD = "randomly generated 64 characters"
```

## Launching the server

You can start the server with `npm run dev`.
