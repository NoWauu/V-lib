#!/bin/sh

# Validate RESEND_KEY presence
if [ -z "$RESEND_KEY" ]; then
  echo "RESEND_KEY is empty or not set"
fi

# Export environment variables for the Python app
export FRONT_URL="$FRONT_URL"
export RESEND_KEY="$RESEND_KEY"
export DB_HOST="$DB_HOST"
export DB_PORT="$DB_PORT"
export DB_NAME="$DB_NAME"
export DB_USER="$DB_USER"
export DB_PASSWORD="$DB_PASSWORD"

# Run setup check
OUTPUT=$(python setup.py)
TRIES=0
MAX_TRIES=50

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
    echo "Postgres is not ready, waiting..."
    sleep 1
    TRIES=$((TRIES + 1))
    if [ "$TRIES" -ge "$MAX_TRIES" ]; then
        echo "Postgres did not become ready in time, exiting."
        exit 1
    fi
done

echo "Postgres is ready"

# Setup the database
export PGPASSWORD="$DB_PASSWORD"
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f database/script.pgsql
python manage.py migrate --fake
echo "Database setup complete"

# Check setup success
if echo "$OUTPUT" | grep -q "success"; then
    echo "Launching server..."
    python manage.py runserver
else
    echo "Missing or invalid key(s). Are you sure you have a valid RESEND_KEY?"
    echo "Shutting down the container..."
    exit 1
fi