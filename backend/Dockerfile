# Use the official Python 3.12 image as a base
FROM python:3.12-slim

# Set environment variables
# Prevents Python from writing .pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
# Ensures stdout and stderr are flushed immediately
ENV PYTHONUNBUFFERED=1

# Install system dependencies needed by psycopg2
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc libc-dev libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy requirements file into the container and install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application code to the container
COPY . /app/

# Expose port 8000 for the Django application
EXPOSE 8000

# Run the Django development server
CMD ["./wait-for-it.sh", "db:5432", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]
