# AWS EC2 Deployment Guide - FitTrack Frontend

This guide covers deploying the FitTrack frontend to AWS EC2 with Docker.

## Prerequisites

- AWS account with EC2 access
- SSH key pair for EC2
- Domain configured in Route 53 (or DNS provider)
  - Production: `trackerfit.online` → EC2 IP
  - Development: `dev.trackerfit.online` → EC2 IP

## Step 1: Launch EC2 Instance

### Recommended Instance

- **Type**: t3.small (or t3.micro for dev)
- **AMI**: Ubuntu 22.04 LTS
- **Storage**: 20GB gp3

### Security Group Rules

| Port | Protocol | Source    | Purpose            |
| ---- | -------- | --------- | ------------------ |
| 22   | TCP      | Your IP   | SSH                |
| 80   | TCP      | 0.0.0.0/0 | HTTP               |
| 443  | TCP      | 0.0.0.0/0 | HTTPS              |
| 3000 | TCP      | 0.0.0.0/0 | Next.js (optional) |

## Step 2: Setup EC2 Instance

SSH into your instance and run:

```bash
# Download and run setup script
curl -sSL https://raw.githubusercontent.com/your-repo/fit-webappv1/main/aws/ec2-setup.sh | bash

# Log out and back in for Docker group
exit
```

After re-logging:

```bash
# Verify Docker
docker --version
docker compose version
```

## Step 3: Install Nginx

```bash
sudo apt-get update
sudo apt-get install -y nginx

# Copy nginx config
sudo cp aws/nginx-prod.conf /etc/nginx/sites-available/trackerfit.online
sudo ln -s /etc/nginx/sites-available/trackerfit.online /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

## Step 4: Setup SSL

```bash
chmod +x aws/ssl-setup.sh
sudo ./aws/ssl-setup.sh prod
```

## Step 5: Deploy Application

### From Local Machine

```bash
# Set environment variables
export EC2_HOST="your-ec2-ip-or-domain"
export EC2_KEY="~/.ssh/your-key.pem"

# Deploy production
./deploy-ec2.sh prod

# Or deploy development
./deploy-ec2.sh dev
```

## Step 6: Verify Deployment

```bash
# Check container status
ssh -i $EC2_KEY ubuntu@$EC2_HOST "docker compose ps"

# Check logs
ssh -i $EC2_KEY ubuntu@$EC2_HOST "docker compose logs -f"
```

Visit your domain:

- Production: https://trackerfit.online
- Development: https://dev.trackerfit.online

## Updating the Application

Simply run the deploy script again:

```bash
./deploy-ec2.sh prod
```

## Troubleshooting

### Container not starting

```bash
ssh -i $EC2_KEY ubuntu@$EC2_HOST "cd fittrack-frontend && docker compose logs"
```

### Nginx errors

```bash
ssh -i $EC2_KEY ubuntu@$EC2_HOST "sudo nginx -t && sudo tail -f /var/log/nginx/error.log"
```

### SSL issues

```bash
ssh -i $EC2_KEY ubuntu@$EC2_HOST "sudo certbot renew --dry-run"
```
