# Django backend server

## Overview

This folder contains the Django server. It is used to obtain and handle the data from v-lib.

It is also used by the web app to read the data and display it on the pages. 


## Structure

This is the structure of the folder:

`VlibBackend` contains the files of the Django project.

`VlibStations` is the Django application in which all the functions to get the data are stored.

`manage.py` is the file used to manage the [Django](https://www.djangoproject.com/) server.

`Pipfile` and `Pipfile.lock` are the pipenv files used to easily create the virtual environment and download the dependencies.

## Prerequisites

The server requires [Python 3.12](https://www.python.org/downloads/) in order to run.
You also need to have the `Django` and `pipenv` librairies installed on your computer.

## Server setup

You need to use a secret key with Django. 
You can use a [key generator](https://djecrety.ir/) found on internet.
You also need to configure the database credentials.

To do that, create a file named `.env`.
The structure must look like this:

```
DJANGO_SECRET_KEY="insert your key here"

DB_NAME="your database name"

DB_USER="name of the user in the database"

DB_PASSWORD="password of the user"

DB_HOST="address of the database"

DB_PORT="port used for PostgreSQL"

RSA_PRIVATE_KEY="your key here" 

RSA_PUBLIC_KEY="your key here"

HMAC_SECRET_KEY="your key here"
```

In order to get the RSA and HMAC keys, you can run the `keys.py` file inside the `encryption` folder. Copy and paste the whole keys inside of the dedicated fields.

As instance, the public RSA key should look like this :
```
RSA_PUBLIC_KEY="-----BEGIN RSA PUBLIC KEY-----
MIGJAoGBAJrA8lq0RqmgEOMNs6y6gPPR2dbcASc4gSShN07bqLGKktzsECqIOxPU
uQHTJmvgqpSMW8dW+iwnOAuCqviynCf3Dw8IPWhPca2uRtoNTNRYJW2LX8iyB+Nz
EKEna2JepwxXCpytBQDUHVghtBGii8/dNHEi46GqVibfjsScMU8fAgMBAAE=
-----END RSA PUBLIC KEY-----" 
```

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
python manage.py makemigrations
python manage.py migrate --fake
```
