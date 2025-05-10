#!/bin/sh

# Create virtual environment and install dependencies
if [ -z "$RESEND_KEY" ]; then
  echo "RESEND_KEY is empty or not set"
fi

export RESEND_KEY="$RESEND_KEY"
export FRONT_URL="$FRONT_URL"

export DB_HOST="$DB_HOST"
export DB_PORT="$DB_PORT"
export DB_NAME="$DB_NAME"
export DB_USER="$DB_USER"
export DB_PASSWORD="$DB_PASSWORD"

pipenv install --system --deploy --ignore-pipfile

# Environment variables setup
OUTPUT=$(python setup.py)

# Check if the file contains the RESEND key
if [[ "$OUTPUT" == *"success"* ]]; then
    echo "Launching server..."
    pipenv run python manage.py runserver
else
    echo "Missing key(s) in the .env file. Are you sure you have given a valid RESEND key?"
    echo "Shutting down the container..."
    exit 1
fi
