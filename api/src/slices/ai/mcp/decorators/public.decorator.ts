// @scope:api
// @slice:mcp
// @layer:presentation
// @type:decorator

import { SetMetadata } from '@nestjs/common';

export const MCP_IS_PUBLIC_KEY = 'mcpIsPublic';
export const Public = () => SetMetadata(MCP_IS_PUBLIC_KEY, true); 