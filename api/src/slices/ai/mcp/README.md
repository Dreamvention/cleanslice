# MCP Tools Authentication

This module provides MCP (Model Context Protocol) tools with flexible authentication support.

## Overview

MCP tools can be configured to require authentication or be publicly accessible using the `@Public()` decorator.

## Usage

### Public Tools (No Authentication Required)

Use the `@Public()` decorator to make a tool accessible without authentication:

```typescript
@Public()
@Tool({
  name: 'ping',
  description: 'Simple ping tool that does not require authentication',
  parameters: z.object({
    message: z.string().optional(),
  }),
})
async ping({ message = 'pong' }, context: Context) {
  return {
    content: [{ type: 'text', text: `Ping: ${message}` }],
  };
}
```

### Protected Tools (Authentication Required)

Tools without the `@Public()` decorator require authentication:

```typescript
@Tool({
  name: 'GetMe',
  description: 'Returns the current user',
  parameters: z.object({}),
})
async getMe(context: Context, request: RequestWithUser) {
  return {
    content: [{ type: 'text', text: JSON.stringify(request.user) }],
  };
}
```

## Authentication Methods

The system supports two authentication methods:

1. **JWT Tokens** (Cognito) - Bearer token in Authorization header
2. **API Keys** - API key in the `api-key` header

## Examples

### Available Tools

- `ping` - Public tool, no authentication required
- `login` - Public tool for user authentication
- `GetMe` - Protected tool, requires authentication
- `hello-world` - Protected tool, requires authentication

### Testing

1. **Public tools** can be called without any authentication headers
2. **Protected tools** require either:
   - Valid JWT token: `Authorization: Bearer <token>`
   - Valid API key: `api-key: <key>`

## Architecture

- Authentication is checked at the tool execution level in `McpToolsHandler`
- Uses `@Public()` decorator pattern similar to NestJS controllers
- Supports both Cognito and API key authentication methods
