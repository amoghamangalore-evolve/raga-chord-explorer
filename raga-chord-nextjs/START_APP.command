#!/bin/bash

# Navigate to the app directory
cd "$(dirname "$0")"

echo "════════════════════════════════════════════════════"
echo "    🎵  RAGA CHORD EXPLORER - Next.js Version  🎵"
echo "════════════════════════════════════════════════════"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed yet!"
    echo ""
    echo "Please install Node.js first:"
    echo "1. Download from: https://nodejs.org/"
    echo "2. Install the .pkg file"
    echo "3. Run this script again"
    echo ""
    read -p "Press Enter to open the download page..."
    open https://nodejs.org/en/download/
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo "✅ npm is installed: $(npm --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (this takes 2-3 minutes, first time only)..."
    echo ""
    npm install
    echo ""
fi

echo "🚀 Starting the development server..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Your app will open at: http://localhost:3000"
echo "  Press Ctrl+C to stop the server when you're done"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start the development server in background briefly to let it initialize
npm run dev &
SERVER_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 5

# Open browser with proper URL
echo "🌐 Opening browser..."
open "http://127.0.0.1:3000" || open "http://localhost:3000"

echo ""
echo "✅ Server is running!"
echo "📍 If browser didn't open, visit: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Bring npm run dev to foreground
wait $SERVER_PID
