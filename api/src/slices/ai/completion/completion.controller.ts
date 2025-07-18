// @scope:api
// @slice:ai/completion
// @layer:presentation
// @type:controller

import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { experimental_createMCPClient, streamText, CoreMessage } from 'ai';
import { openai } from '@ai-sdk/openai';
import { CompletionDto } from './dtos';
import { Public } from '#user/auth/public.decorator';

interface MCPClient {
  client: any;
  type: string;
  url?: string;
}

@ApiTags('ai/completion')
@Controller('ai/completion')
export class CompletionController {
  @ApiOperation({
    description: 'Generate AI completion with streaming response using MCP tools',
    operationId: 'generateCompletion',
  })
  @ApiBody({ type: CompletionDto })
  @ApiResponse({
    status: 200,
    description: 'Streaming AI completion response',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Public()
  @Post()
  async generateCompletion(@Body() data: CompletionDto, @Res() res: Response) {
    if (!Array.isArray(data.messages) || data.messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    const mcpClients: MCPClient[] = [];

    try {
      const sseClient = await experimental_createMCPClient({
        transport: {
          type: 'sse',
          url: 'http://localhost:3333/sse',
        },
      });
      mcpClients.push({
        client: sseClient,
        type: 'sse',
        url: 'http://localhost:3333/sse',
      });

      const allTools: Record<string, any> = {};

      for (const mcpClient of mcpClients) {
        const toolSet = await mcpClient.client.tools();
        Object.assign(allTools, toolSet);
      }

      const aiMessages = this.convertMessagesToAISDKFormat(data.messages);

      const result = streamText({
        model: openai('gpt-4o'),
        tools: allTools,
        maxSteps: 10,
        messages: aiMessages,
        system: `You are a helpful AI assistant with access to various tools to retrieve and analyze data.

When you use tools to get data:
1. Always provide a clear and informative response based on the data you receive
2. Analyze the data and give meaningful insights
3. Format your response in a user-friendly way
4. If you receive user data, summarize key information like names, emails, roles, and team memberships
5. Be conversational and helpful in your explanations

For example, if you get user data, you might say: "I found X users in the system. Here's a summary: [user details]..."`,
        onFinish: async () => {
          console.log('Streaming finished, closing MCP clients');
          await this.closeAllClients(mcpClients);
        },
        onError: async (error) => {
          console.error('Streaming error:', error);
          await this.closeAllClients(mcpClients);
        },
      });

      result.pipeUIMessageStreamToResponse(res)
    } catch (error) {
      console.error('Completion error:', error);
      await this.closeAllClients(mcpClients);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  /**
   * Convert DTO messages to AI SDK format
   */
  private convertMessagesToAISDKFormat(messages: CompletionDto['messages']): CoreMessage[] {
    if (!messages) return [];

    return messages
      .filter(message => {
        // Filter out messages that contain UI-specific parts like step-start, tool-invocation
        const hasValidParts = message.parts.some(part => part.type === 'text' && part.text);
        return hasValidParts;
      })
      .map(message => {
        // Only include text parts
        const textParts = message.parts
          .filter(part => part.type === 'text' && part.text)
          .map(part => ({
            type: 'text' as const,
            text: part.text
          }));

        return {
          role: message.role as 'user' | 'assistant',
          content: textParts
        };
      })
      .filter(message => message.content.length > 0); // Remove messages with no valid content
  }


  /**
   * Safely close all MCP clients
   */
  private async closeAllClients(clients: MCPClient[]): Promise<void> {
    for (const mcpClient of clients) {
      try {
        await mcpClient.client.close();
      } catch (error) {
        console.warn(`Failed to close ${mcpClient.type} MCP client:`, error.message);
      }
    }
  }
}
