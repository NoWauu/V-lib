FROM python:3.12.10-alpine

ENV FRONT_URL=http://localhost:3000

ENV RESEND_KEY=

ENV DB_HOST=localhost
ENV DB_PORT=28152
ENV DB_USER=sae_vlib
ENV DB_PASSWORD=1234
ENV DB_NAME=vlib

# Copy the folders from the host to the container
COPY ./database /app/
COPY ./encryption /app/
COPY ./VlibBackend /app/
COPY ./VlibStations /app/
COPY ./VlibUsers /app/

# Requirements files to install the dependencies
COPY ./Pipfile /app/
COPY ./Pipfile.lock /app/
COPY ./manage.py /app/

COPY ./env_sample.txt /app/.env

# Script to generate and write the keys
COPY ./setup.py /app/

# Script to launch the Django server
COPY ./launch.sh /app/

WORKDIR /app

RUN chmod +x ./launch.sh

# Install necessary packages
RUN apk add --no-cache postgresql-dev gcc musl-dev

# Install pipenv and the dependencies
RUN pip install --upgrade pip && pip install pipenv

# Expose the port the app runs on
EXPOSE 8000

ENTRYPOINT [ "./launch.sh" ]
