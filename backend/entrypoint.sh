#!/urs/bin/env bash

#pipenv run 
python manage.py migrate --fake

python manage.py makemigrations

python manage.py runerver