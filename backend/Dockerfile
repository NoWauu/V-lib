FROM python:3.12-slim

WORKDIR /app 

# Installer les dépendances de construction
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip
RUN pip install pipenv

COPY Pipfile* ./

RUN pipenv install
#a supprimer (j'espert)
#RUN pip install django
#RUN pip install python-dotenv
#RUN pip install requests
#RUN pip install psycopg2
#RUN pip install rsa
#RUN pip install bcrypt
#RUN pip install resend
#RUN pip install django-cors-headers

COPY . .

RUN pipenv run python manage.py migrate --fake
RUN python manage.py makemigrations

ENV PORT=8000
EXPOSE 8000

CMD ["python", "manage.py", "runserver"]