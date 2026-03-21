#!/bin/bash
set -e

echo "==================================="
echo "  AdGuard Home - Quick Start"
echo "==================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed."
    echo ""
    echo "Install Docker Desktop from:"
    echo "  https://docs.docker.com/desktop/install/mac-install/"
    echo ""
    echo "After installing, open Docker Desktop and wait for it to start,"
    echo "then run this script again."
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null 2>&1; then
    echo "Docker Desktop is not running."
    echo "Please open Docker Desktop and wait for it to start,"
    echo "then run this script again."
    exit 1
fi

echo "Docker is ready."
echo ""

# Check if port 53 is in use (common on macOS)
if lsof -i :53 &> /dev/null 2>&1; then
    echo "Warning: Port 53 is already in use."
    echo "On macOS, this is often the built-in DNS resolver."
    echo ""
    echo "To free port 53, you can temporarily disable it:"
    echo "  sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.mDNSResponder.plist"
    echo ""
    echo "To re-enable it later:"
    echo "  sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.mDNSResponder.plist"
    echo ""
    read -p "Try starting anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Start AdGuard Home
echo "Starting AdGuard Home..."
docker compose up -d

echo ""
echo "==================================="
echo "  AdGuard Home is running!"
echo "==================================="
echo ""
echo "1. Open the setup wizard:"
echo "   http://localhost:3000"
echo ""
echo "2. After setup, the dashboard moves to:"
echo "   http://localhost:80"
echo ""
echo "3. To use it as your DNS, go to:"
echo "   System Settings > Network > Wi-Fi > Details > DNS"
echo "   Add: 127.0.0.1"
echo ""
echo "To stop:  docker compose down"
echo "To logs:  docker compose logs -f"
echo ""
