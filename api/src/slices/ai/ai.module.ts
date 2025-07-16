// @scope:api
// @slice:ai
// @layer:presentation
// @type:module

import { Module } from '@nestjs/common';
import { CompletionModule } from './completion';
import { McpModule } from './mcp';
import { UserGuard } from '#user/user.guard';

@Module({
  imports: [
    CompletionModule,
    McpModule.forRoot({
      name: 'cmx-mcp-server',
      version: '1.0.0',
      // transport: McpTransportType.STDIO,
      capabilities: {
        tools: {},
        resources: {},
        resourceTemplates: {},
        prompts: {},
      },
      // guards: [UserGuard],
      guards: [],
      decorators: [],
      // transport: McpTransportType.STREAMABLE_HTTP,
      // streamableHttp: {
      //   enableJsonResponse: true,
      //   sessionIdGenerator: undefined,
      //   statelessMode: true,
      // },
      // We'll add guards later if needed
    }),
  ],
  exports: [CompletionModule],
})
export class AiModule {}
