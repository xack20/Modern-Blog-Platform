#!/bin/bash

# Modern Blog Platform Setup Script
# This script helps set up and seed the Modern Blog Platform

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print banner
echo -e "${GREEN}"
echo "====================================================="
echo "         Modern Blog Platform Setup Script           "
echo "====================================================="
echo -e "${NC}"

# Function to check if Docker is running
check_docker() {
  echo -e "${YELLOW}Checking if Docker is running...${NC}"
  if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Docker is not running. Please start Docker and try again.${NC}"
    exit 1
  fi
  echo -e "${GREEN}Docker is running!${NC}"
}

# Function to start database
start_database() {
  echo -e "${YELLOW}Starting PostgreSQL database...${NC}"
  docker-compose up -d
  echo -e "${GREEN}PostgreSQL database started successfully!${NC}"
}

# Function to set up backend
setup_backend() {
  echo -e "${YELLOW}Setting up backend...${NC}"
  cd blog-backend
  
  echo "Installing dependencies..."
  npm install
  
  echo "Generating Prisma client..."
  npm run prisma:generate
  
  echo "Applying database migrations..."
  npm run prisma:migrate
  
  echo "Seeding the database..."
  npm run db:seed
  
  cd ..
  echo -e "${GREEN}Backend setup completed successfully!${NC}"
}

# Function to set up frontend
setup_frontend() {
  echo -e "${YELLOW}Setting up frontend...${NC}"
  cd blog-frontend
  
  echo "Installing dependencies..."
  npm install
  
  cd ..
  echo -e "${GREEN}Frontend setup completed successfully!${NC}"
}

# Function to start development servers
start_dev_servers() {
  echo -e "${YELLOW}Starting development servers...${NC}"
  
  # Starting backend server in the background
  echo "Starting backend server..."
  cd blog-backend
  npm run start:dev &
  BACKEND_PID=$!
  cd ..
  
  # Wait a bit for backend to initialize
  sleep 5
  
  # Starting frontend server in the background
  echo "Starting frontend server..."
  cd blog-frontend
  npm run dev &
  FRONTEND_PID=$!
  cd ..
  
  echo -e "${GREEN}Development servers started successfully!${NC}"
  echo -e "${GREEN}Backend: http://localhost:3001/graphql${NC}"
  echo -e "${GREEN}Frontend: http://localhost:3000${NC}"
  
  echo -e "${YELLOW}Press Ctrl+C to stop all servers...${NC}"
  
  # Handle signals
  trap 'kill $BACKEND_PID $FRONTEND_PID; exit' INT TERM
  
  # Wait for child processes to finish
  wait
}

# Main function
main() {
  check_docker
  start_database
  setup_backend
  setup_frontend
  
  echo -e "${GREEN}"
  echo "====================================================="
  echo "         Modern Blog Platform Setup Complete         "
  echo "====================================================="
  echo -e "${NC}"
  echo -e "You can now:"
  echo -e "1. Start backend: ${YELLOW}cd blog-backend && npm run start:dev${NC}"
  echo -e "2. Start frontend: ${YELLOW}cd blog-frontend && npm run dev${NC}"
  echo -e "3. Access Prisma Studio: ${YELLOW}cd blog-backend && npm run prisma:studio${NC}"
  echo -e "${YELLOW}Would you like to start the development servers now? [y/N]${NC}"
  
  read -r response
  if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    start_dev_servers
  else
    echo -e "${GREEN}Setup completed without starting servers.${NC}"
  fi
}

main
