# Use the official Python 3.12 image as a base
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies for psycopg2
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc libc-dev libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app/

# Expose port 8080 for Gunicorn (aligned with Cloud Run expectations)
EXPOSE 8080

# Command to run Django with Gunicorn on Cloud Run
CMD gunicorn app.wsgi:application --bind 0.0.0.0:$PORT
