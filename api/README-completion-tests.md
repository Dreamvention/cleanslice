# AI Completion Endpoint Testing

This directory contains curl test scripts for the AI completion endpoint.

## Prerequisites

1. Make sure the API server is running on port 3333
2. Ensure the MCP server is running on `http://localhost:3333/sse`

## Test Scripts

### 1. Simple Test (`curl-test-simple.sh`)

Quick test with a single request:

```bash
chmod +x curl-test-simple.sh
./curl-test-simple.sh
```

### 2. Comprehensive Test (`test-completion.sh`)

Full test suite with multiple scenarios:

```bash
chmod +x test-completion.sh
./test-completion.sh
```

## Manual Curl Commands

### Basic Completion Request

```bash
curl -X POST "http://localhost:3333/ai/completion" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a JavaScript function to calculate the factorial of a number"
  }' \
  --no-buffer
```

### Test MCP Connection

```bash
curl -X GET "http://localhost:3333/ai/completion/test-mcp" \
  -H "Content-Type: application/json"
```

### With Verbose Output

```bash
curl -X POST "http://localhost:3333/ai/completion" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Hello, how are you today?"
  }' \
  --no-buffer \
  -v
```

## Expected Behavior

1. **Successful Request**: Should return streaming text response
2. **MCP Connection**: Should return connection status and available tools
3. **Invalid Request**: Should return validation error
4. **Empty Prompt**: Should return validation error

## Troubleshooting

### Endpoint Not Responding

- Check if the API server is running on port 3333
- Verify the endpoint path is correct: `/ai/completion`

### Streaming Not Working

- Use `--no-buffer` flag to see real-time streaming
- Check server logs for any errors
- Ensure MCP server is running and accessible

### MCP Connection Issues

- Verify MCP server is running on `http://localhost:3333/sse`
- Check the `/test-mcp` endpoint for connection status
- Review server logs for MCP-related errors

## Response Format

The completion endpoint should return streaming text responses. The MCP test endpoint returns JSON with:

```json
{
  "connected": true/false,
  "tools": ["tool1", "tool2", ...],
  "error": "error message if any"
}
```
