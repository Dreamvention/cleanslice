#!/bin/bash

# Simple curl test for AI completion endpoint
# Usage: ./curl-test-simple.sh

echo "🧪 Simple AI Completion Test"
echo "============================"

curl -X POST "http://localhost:3333/ai/completion" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a JavaScript function to calculate the factorial of a number"
  }' \
  --no-buffer \
  -v 