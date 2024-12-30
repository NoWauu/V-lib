# Django backend server

## Overview

This folder contains the Django server. It is used to obtain and handle the data from v-lib.

It is also used by the web app to read the data and display it on the pages. 


## Structure

This is the structure of the folder:

`VlibBackend` contains the files of the Django project.


`VlibData` is the Django application in which all the functions to get the data are stored.


`manage.py` is the file used to manage the [Django](https://www.djangoproject.com/) server.

`Pipfile` and `Pipfile.lock` are the pipenv files used to easily create the virtual environment and download the dependencies.

## Server setup

You need to use a secret key with Django. 
You can use a [key generator](https://djecrety.ir/) found on internet.
You also need to configure the database credentials.

To do that, create a file named `.env`.
The structure must look like this:

```
SECRET_KEY="insert your key here"

DB_NAME="your database name"
DB_USER="name of the user in the database"
DB_HOST="address of the database"
DB_PORT="port used for PostgreSQL"
DB_PASSWORD="the password of the user"
```


## Prerequisites

The server requires [Python 3.12](https://www.python.org/downloads/) in order to run.
You also need to have the librairies `Django` and `pipenv` installed on your computer.

## Launching the server

Firstly, create a virtual environment with:
```bash
pipenv shell
```
    
Then, install all the dependencies on the
virtual environment with:
```bash 
pipenv install
```

Finally, you can launch the server with:
```bash
python manage.py runserver
``` 

You might need to execute, if asked in the terminal:
```bash 
python manage.py migrate
```
