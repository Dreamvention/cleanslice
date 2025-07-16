// @scope:api
// @slice:mcp
// @layer:module
// @type:module

import { Module } from '@nestjs/common';
import { McpModule } from '#ai/mcp';
import { PrismaModule } from '#prisma/prisma.module';
import { MCPAuthService } from './domain/mcpAuth.service';
import { ApiKeyModule } from '#user/apiKey/apiKey.module';
import { McpAuthGuard } from '#ai/mcp/guards';

@Module({
  imports: [
    ApiKeyModule,
    McpModule.forRoot({
      name: 'agentfy-mcp-server',
      version: '1.0.0',
      globalApiPrefix: 'v1/',
      // transport: McpTransportType.STDIO,
      capabilities: {
        tools: {},
        resources: {},
        resourceTemplates: {},
        prompts: {},
      },
      guards: [McpAuthGuard],
      decorators: [],
      // transport: McpTransportType.STREAMABLE_HTTP,
      // streamableHttp: {
      //   enableJsonResponse: true,
      //   sessionIdGenerator: undefined,
      //   statelessMode: true,
      // },
      // We'll add guards later if needed
    }),
    PrismaModule,
  ],
  providers: [MCPAuthService],
  exports: [MCPAuthService],
})
export class McpTestModule {}
