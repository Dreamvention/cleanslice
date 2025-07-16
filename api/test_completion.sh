#!/bin/bash

# Test the completion endpoint with streaming
curl -X POST \
  http://localhost:3000/ai/completion \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a short poem about coding"
  }' \
  --no-buffer \
  -v

echo -e "\n\nTest completed."