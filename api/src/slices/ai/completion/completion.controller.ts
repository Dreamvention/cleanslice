// @scope:api
// @slice:ai/completion
// @layer:presentation
// @type:controller

import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { experimental_createMCPClient, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { CompletionDto } from './dtos';
import { Public } from '#user/auth/public.decorator';
import { randomUUID } from 'crypto';

@ApiTags('ai/completion')
@Controller('ai/completion')
export class CompletionController {
  @ApiOperation({
    description: 'Generate AI completion with streaming response',
    operationId: 'generateCompletion',
  })
  @ApiBody({ type: CompletionDto })
  @ApiResponse({ status: 200, description: 'Streaming AI completion response' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Public()
  @Post()
  async generateCompletion(@Body() data: CompletionDto, @Res() res: Response) {
    // Handle both messages array and direct prompt
    const prompt = data.messages
      ? Array.isArray(data.messages)
        ? data.messages[data.messages.length - 1]?.content
        : data.messages
      : data.prompt;

    try {
      const sseClient = await experimental_createMCPClient({
        transport: {
          type: 'sse',
          url: 'http://localhost:3333/sse',
        },
      });

      const toolSetTwo = await sseClient.tools();

      const tools = {
        ...toolSetTwo, // note: this approach causes subsequent tool sets to override tools with the same name
      };

      const response = await streamText({
        model: openai('gpt-4o'),
        tools,
        prompt,
      });

      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      for await (const chunk of response.textStream) {
        console.log(chunk);
        // Send JSON-encoded text chunk in AI SDK format
        res.write(`0:${JSON.stringify(chunk)}\n`);
      }

      // Send finish message
      res.write(`d:${JSON.stringify({ finishReason: 'stop' })}\n`);
      res.end();
    } catch (error) {
      console.error('Internal error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}
