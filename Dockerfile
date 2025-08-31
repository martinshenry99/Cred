# Multi-stage build for CRED Application
FROM node:18-alpine AS frontend-build

# Build frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY frontend/ ./
RUN yarn build

# Backend stage
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy built frontend static files
COPY --from=frontend-build /app/frontend/build ./frontend/build/

# Create uploads directory
RUN mkdir -p /app/uploads

# Set environment variables
ENV PYTHONPATH=/app
ENV FRONTEND_BUILD_PATH=/app/frontend/build

# Expose port
EXPOSE 8000

# Start command
CMD ["uvicorn", "backend.server:app", "--host", "0.0.0.0", "--port", "8000"]