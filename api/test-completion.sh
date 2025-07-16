#!/bin/bash

# Test script for AI completion endpoint
# Make sure the API server is running on port 3333

BASE_URL="http://localhost:3333"
COMPLETION_ENDPOINT="$BASE_URL/ai/completion"

echo "🧪 Testing AI Completion Endpoint"
echo "=================================="

# Test 1: Basic completion request
echo ""
echo "📝 Test 1: Basic completion request"
echo "-----------------------------------"
curl -X POST "$COMPLETION_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a simple JavaScript function to calculate the factorial of a number"
  }' \
  --no-buffer \
  -v

echo ""
echo ""

# Test 2: Simple prompt
echo "📝 Test 2: Simple prompt"
echo "------------------------"
curl -X POST "$COMPLETION_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Hello, how are you today?"
  }' \
  --no-buffer

echo ""
echo ""

# Test 3: Code generation prompt
echo "📝 Test 3: Code generation prompt"
echo "---------------------------------"
curl -X POST "$COMPLETION_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a Python function that reverses a string without using any built-in reverse methods"
  }' \
  --no-buffer

echo ""
echo ""

# Test 4: Test MCP connection endpoint
echo "🔧 Test 4: Test MCP connection"
echo "-------------------------------"
curl -X GET "$COMPLETION_ENDPOINT/test-mcp" \
  -H "Content-Type: application/json" \
  -v

echo ""
echo ""

# Test 5: Invalid request (missing prompt)
echo "❌ Test 5: Invalid request (missing prompt)"
echo "-------------------------------------------"
curl -X POST "$COMPLETION_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{}' \
  -v

echo ""
echo ""

# Test 6: Empty prompt
echo "❌ Test 6: Empty prompt"
echo "----------------------"
curl -X POST "$COMPLETION_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": ""
  }' \
  -v

echo ""
echo ""

# Test 7: Long prompt
echo "📝 Test 7: Long prompt"
echo "----------------------"
curl -X POST "$COMPLETION_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a comprehensive guide on how to implement a REST API using Node.js and Express. Include authentication, error handling, database integration, and testing strategies. Make sure to cover best practices for security and performance optimization."
  }' \
  --no-buffer

echo ""
echo ""
echo "✅ All tests completed!"
echo ""
echo "💡 Tips:"
echo "- Use --no-buffer flag to see streaming responses in real-time"
echo "- The endpoint should return streaming text responses"
echo "- Check the server logs for any MCP connection issues"
echo "- Make sure the MCP server is running on http://localhost:3333/sse" 