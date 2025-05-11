# syntax=docker.io/docker/dockerfile:1.7-labs
FROM python:3.12.10-slim AS builder

# Install system dependencies
RUN apt update && apt install -y --no-install-recommends \
    build-essential \
    gcc \
    libpq-dev \
    dos2unix \
 && apt clean \
 && rm -rf /var/lib/apt/lists/*

# Install pipenv temporarily
RUN pip install --upgrade pip && pip install pipenv

# Copy Pipfile files
COPY . /app

WORKDIR /app

# Install dependencies directly to /install
RUN mkdir /install && \
    pipenv requirements > requirements.txt

# Install dependencies
RUN pip install --no-deps -r requirements.txt -t /install



# Final slim image
FROM python:3.12.10-slim AS final

WORKDIR /app

RUN apt update && apt install -y --no-install-recommends \
    libpq5 \
    postgresql-client \
 && apt clean \
 && rm -rf /var/lib/apt/lists/*

# Copy installed site-packages
COPY --from=builder /install /usr/local/lib/python3.12/site-packages
COPY --exclude=Pipfile* --from=builder /app /app

# Set environment variables
ENV FRONT_URL=http://localhost:3000 \
    RESEND_KEY= \
    DB_HOST=db \
    DB_PORT=5432 \
    DB_USER=sae_vlib \
    DB_PASSWORD=1234 \
    DB_NAME=vlib

EXPOSE 8000
ENTRYPOINT ["/app/launch.sh"]