#!/bin/bash

# ===========================================
# EC2 Instance Setup Script
# ===========================================
# Run this script on a fresh Ubuntu EC2 instance to install Docker
# Usage: ssh into EC2, then: curl -sSL <url> | bash

set -e

echo "=== Installing Docker on EC2 ==="

# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install prerequisites
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add current user to docker group
sudo usermod -aG docker $USER

# Start Docker
sudo systemctl enable docker
sudo systemctl start docker

echo "=== Docker Installation Complete ==="
echo "Please log out and back in for group changes to take effect."
echo ""
echo "To verify Docker installation: docker --version"
echo "To verify Docker Compose: docker compose version"
