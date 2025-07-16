import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { CallToolRequestSchema, ErrorCode, ListToolsRequestSchema, McpError } from '@modelcontextprotocol/sdk/types.js';
import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Request } from 'express';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { McpRegistryService } from '../mcp-registry.service';
import { McpHandlerBase } from './mcp-handler.base';
import { MCP_IS_PUBLIC_KEY } from '../../decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { McpAuthGuard } from '#ai/mcp/guards';
import { IUserData } from '#user/user/domain';

interface RequestWithUser extends Request {
  user?: IUserData;
  cognito_user?: {
    email: string;
  };
}

@Injectable({ scope: Scope.REQUEST })
export class McpToolsHandler extends McpHandlerBase {
  private reflector: Reflector;
  private mcpAuthGuard: McpAuthGuard;

  constructor(moduleRef: ModuleRef, registry: McpRegistryService) {
    super(moduleRef, registry, McpToolsHandler.name);
  }

  private async checkAuthentication(httpRequest: RequestWithUser, toolInfo: any): Promise<void> {
    // Check if tool is marked as public
    // We need to resolve the actual instance to get the method metadata
    const contextId = ContextIdFactory.getByRequest(httpRequest);
    const toolInstance = await this.moduleRef.resolve(toolInfo.providerClass, contextId, { strict: false });

    // Check if reflector is available
    if (!this.reflector) {
      this.logger.error('Reflector not available for authentication check');
      throw new UnauthorizedException(`Authentication service not available for tool: ${toolInfo.metadata.name}`);
    }

    const isPublic = this.reflector.get(MCP_IS_PUBLIC_KEY, toolInstance[toolInfo.methodName]);

    this.logger.debug(`Checking authentication for tool: ${toolInfo.metadata.name}, isPublic: ${isPublic}`);

    if (isPublic) {
      this.logger.debug(`Tool is public, no authentication required: ${toolInfo.metadata.name}`);
      return;
    }

    this.logger.debug(`Authentication required for tool: ${toolInfo.metadata.name}`);

    // Check if guard is available
    if (!this.mcpAuthGuard) {
      this.logger.error('MCP authentication guard not available');
      throw new UnauthorizedException(`Authentication guard not available for tool: ${toolInfo.metadata.name}`);
    }

    // Create proper execution context for guard with the actual method
    const context = {
      getHandler: () => toolInstance[toolInfo.methodName],
      getClass: () => toolInstance.constructor,
      getType: () => 'http' as const,
      getArgs: () => [httpRequest],
      getArgByIndex: (index: number) => [httpRequest][index],
      switchToRpc: () => ({
        getData: () => ({}),
        getContext: () => ({}),
      }),
      switchToWs: () => ({
        getData: () => ({}),
        getClient: () => ({}),
      }),
      switchToHttp: () => ({
        getRequest: () => httpRequest,
        getResponse: () => ({ status: () => ({ json: () => {} }) }),
        getNext: () => ({}),
      }),
    };

    try {
      // Use the unified MCP auth guard
      await this.mcpAuthGuard.canActivate(context as any);
      this.logger.debug('MCP authentication successful');
      return;
    } catch (e) {
      this.logger.debug(`MCP authentication failed: ${e.message}`);
      throw new UnauthorizedException(`Authentication required for tool: ${toolInfo.metadata.name}`);
    }
  }

  async registerHandlers(mcpServer: McpServer, httpRequest: RequestWithUser) {
    // Resolve guards for this request
    const contextId = ContextIdFactory.getByRequest(httpRequest);

    try {
      this.reflector = await this.moduleRef.resolve(Reflector, contextId, { strict: false });
      this.mcpAuthGuard = await this.moduleRef.resolve(McpAuthGuard, contextId, { strict: false });
    } catch (error) {
      this.logger.error(`Failed to resolve authentication dependencies: ${error.message}`);
      // Continue without authentication - tools will fail with proper error messages
    }

    mcpServer.server.setRequestHandler(ListToolsRequestSchema, () => {
      const tools = this.registry.getTools().map((tool) => ({
        name: tool.metadata.name,
        description: tool.metadata.description,
        inputSchema: tool.metadata.parameters ? zodToJsonSchema(tool.metadata.parameters) : undefined,
      }));

      return {
        tools,
      };
    });

    mcpServer.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      this.logger.debug('CallToolRequestSchema is being called');

      const toolInfo = this.registry.findTool(request.params.name);

      if (!toolInfo) {
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
      }

      try {
        // Check authentication if required
        await this.checkAuthentication(httpRequest, toolInfo);

        this.moduleRef.registerRequestByContextId(httpRequest, contextId);

        const toolInstance = await this.moduleRef.resolve(toolInfo.providerClass, contextId, { strict: false });

        const context = this.createContext(mcpServer, request);

        if (!toolInstance) {
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
        }

        const result = await toolInstance[toolInfo.methodName].call(
          toolInstance,
          request.params.arguments,
          context,
          httpRequest,
        );

        this.logger.debug(result, 'CallToolRequestSchema result');

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return result;
      } catch (error) {
        this.logger.error(error);
        return {
          content: [{ type: 'text', text: error.message }],
          isError: true,
        };
      }
    });
  }
}
