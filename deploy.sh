#!/bin/bash

# ===========================================
# FitTrack Deployment Script
# ===========================================

ENV_NAME=$1   # dev, qa, or prod

if [[ -z "$ENV_NAME" ]]; then
  echo "Usage: ./deploy.sh [dev|qa|prod]"
  exit 1
fi

# Map short env to file suffix
case "$ENV_NAME" in
  dev)
    ENV_FILE_SUFFIX="development"
    ;;
  qa)
    ENV_FILE_SUFFIX="qa"
    ;;
  prod)
    ENV_FILE_SUFFIX="production"
    ;;
  *)
    echo "Invalid environment: $ENV_NAME. Use one of: dev, qa, prod"
    exit 1
    ;;
esac

ENV_FILE=".env.$ENV_FILE_SUFFIX"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Environment file '$ENV_FILE' not found!"
  exit 1
fi

echo "Deploying FitTrack using $ENV_FILE ....."

docker compose --env-file "$ENV_FILE" -f docker-compose.yml up -d --build
