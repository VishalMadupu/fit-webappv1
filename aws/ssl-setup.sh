#!/bin/bash

# ===========================================
# SSL Setup Script with Certbot
# ===========================================
# Run this on EC2 after Nginx is installed
# Usage: sudo ./ssl-setup.sh [prod|dev]

set -e

ENV_NAME="${1:-prod}"

echo "=== Setting up SSL with Certbot ==="

# Install Certbot
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Set domain based on environment
if [[ "$ENV_NAME" == "prod" ]]; then
    DOMAIN="trackerfit.online"
    DOMAINS="-d trackerfit.online -d www.trackerfit.online"
elif [[ "$ENV_NAME" == "dev" ]]; then
    DOMAIN="dev.trackerfit.online"
    DOMAINS="-d dev.trackerfit.online"
else
    echo "Invalid environment. Use 'prod' or 'dev'"
    exit 1
fi

echo "Setting up SSL for: $DOMAIN"

# Obtain SSL certificate
sudo certbot --nginx $DOMAINS --non-interactive --agree-tos --email admin@trackerfit.online

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo "=== SSL Setup Complete ==="
echo "Certificate installed for: $DOMAIN"
echo "Auto-renewal is enabled"
