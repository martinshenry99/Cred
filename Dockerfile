# Railway-optimized Dockerfile for CRED Application
FROM node:20-alpine AS frontend-build

# Build frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 300000
COPY frontend/ ./
RUN yarn build

# Backend stage with Python 3.11
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies (minimal)
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Copy production requirements and install Python dependencies
COPY backend/requirements-production.txt ./requirements.txt
RUN pip install --no-cache-dir --upgrade pip setuptools wheel \
    && pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy built frontend static files
COPY --from=frontend-build /app/frontend/build ./frontend/build/

# Create uploads directory
RUN mkdir -p /app/uploads

# Set environment variables
ENV PYTHONPATH=/app
ENV FRONTEND_BUILD_PATH=/app/frontend/build
ENV PORT=8000

# Expose port (Railway uses PORT env var)
EXPOSE $PORT

# Start command for Railway
CMD uvicorn backend.server:app --host 0.0.0.0 --port $PORT