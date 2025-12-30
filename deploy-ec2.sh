#!/bin/bash

# ===========================================
# FitTrack AWS EC2 Deployment Script
# ===========================================
# This script deploys the FitTrack frontend to an AWS EC2 instance
# Prerequisites:
#   - EC2 instance with Docker and Docker Compose installed
#   - SSH key configured for the EC2 instance
#   - Security group allows ports 22, 80, 443, 3000

set -e

# Configuration
EC2_USER="${EC2_USER:-ubuntu}"
EC2_HOST="${EC2_HOST:-}"
EC2_KEY="${EC2_KEY:-~/.ssh/fittrack-ec2.pem}"
REMOTE_DIR="/home/${EC2_USER}/fittrack-frontend"
ENV_NAME="${1:-prod}"

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
print_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Validate inputs
if [[ -z "$EC2_HOST" ]]; then
    print_error "EC2_HOST environment variable is not set"
    echo "Usage: EC2_HOST=<your-ec2-ip> ./deploy-ec2.sh [dev|prod]"
    exit 1
fi

# Map environment to file
case "$ENV_NAME" in
    dev)
        ENV_FILE=".env.development"
        ;;
    prod)
        ENV_FILE=".env.production"
        ;;
    *)
        print_error "Invalid environment: $ENV_NAME. Use 'dev' or 'prod'"
        exit 1
        ;;
esac

if [[ ! -f "$ENV_FILE" ]]; then
    print_error "Environment file '$ENV_FILE' not found!"
    exit 1
fi

print_info "Deploying FitTrack Frontend to EC2"
print_info "Environment: $ENV_NAME"
print_info "EC2 Host: $EC2_HOST"
print_info "Remote Directory: $REMOTE_DIR"

# Step 1: Create remote directory
print_info "Creating remote directory..."
ssh -i "$EC2_KEY" "${EC2_USER}@${EC2_HOST}" "mkdir -p $REMOTE_DIR"

# Step 2: Copy files to EC2
print_info "Copying files to EC2..."
rsync -avz --progress \
    -e "ssh -i $EC2_KEY" \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    ./ "${EC2_USER}@${EC2_HOST}:${REMOTE_DIR}/"

# Step 3: Build and run on EC2
print_info "Building and starting containers on EC2..."
ssh -i "$EC2_KEY" "${EC2_USER}@${EC2_HOST}" << EOF
    cd $REMOTE_DIR
    
    # Load environment variables
    export \$(grep -v '^#' $ENV_FILE | xargs)
    
    # Stop existing containers
    docker compose down || true
    
    # Build and start
    docker compose --env-file $ENV_FILE up -d --build
    
    # Show status
    docker compose ps
EOF

print_info "Deployment complete!"
print_info "Application should be available at: http://${EC2_HOST}:3000"
