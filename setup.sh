#!/bin/bash

# In-Gres Project Setup Script
# This script helps set up the project on a new machine

set -e  # Exit on any error

echo "🚀 Setting up In-Gres project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm $(npm --version) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Create environment files if they don't exist
if [ ! -f "client/.env" ]; then
    echo "📝 Creating client environment file..."
    cp client/.env.example client/.env
    echo "⚠️  Please edit client/.env with your Firebase configuration"
fi

if [ ! -f "server/.env" ]; then
    echo "📝 Creating server environment file..."
    cp server/.env.example server/.env
    echo "✅ Server environment file created"
fi

# Build the project
echo "🔨 Building the project..."
npm run build

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit client/.env with your Firebase configuration"
echo "2. Run 'npm run dev' to start development mode"
echo "3. Run 'npm start' to start production mode"
echo ""
echo "For more information, see README.md"
