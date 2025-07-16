# MCP (Model Context Protocol)

This slice provides a Model Context Protocol server that can be used to expose functionality from other slices to AI models.

## Dependencies

- @rekog/mcp-nest
- @modelcontextprotocol/sdk
- zod

## Installation

```bash
npm install @rekog/mcp-nest @modelcontextprotocol/sdk zod
```

## Architecture

This slice follows Clean Architecture principles:

### Domain Layer

- `McpService`: Defines tools and resources that can be used by AI models

### Presentation Layer

- `McpController`: Exposes the MCP endpoints (handled by @rekog/mcp-nest)

## Usage

To expose functionality from another slice via MCP:

1. Inject the required service/repository from the other slice into `McpService`
2. Create a new tool or resource that wraps the functionality
3. The tool/resource will be automatically available via the MCP endpoints

Example:

```typescript
@Injectable()
export class McpService {
  constructor(private readonly otherSliceService: OtherSliceService) {}

  @Tool({
    name: 'other-slice-tool',
    description: 'Executes functionality from other slice',
    parameters: z.object({
      input: z.string(),
    }),
  })
  async otherSliceTool({ input }, context) {
    const result = await this.otherSliceService.doSomething(input);
    return {
      content: [{ type: 'text', text: result }],
    };
  }
}
```

## Endpoints

The MCP server exposes two main endpoints:

- `GET /mcp/sse`: Server-Sent Events endpoint for real-time communication
- `POST /mcp/messages`: Tool execution endpoint

These endpoints are automatically handled by the @rekog/mcp-nest module.
