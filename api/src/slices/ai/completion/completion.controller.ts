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

@ApiTags('ai/completion')
@Controller('ai/completion')
export class CompletionController {
  @ApiOperation({
    description: 'Generate AI completion with streaming response',
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
    const prompt = Array.isArray(data.messages) ? data.messages[data.messages.length - 1].content : data.messages;

    // const { messages } = data;

    try {
      // const sseClient = await experimental_createMCPClient({
      //   transport: {
      //     type: 'sse',
      //     url: 'http://localhost:3333/sse',
      //   },
      // });

      // const tools = await sseClient.tools();
      const response = await streamText({
        model: openai('gpt-4o'),
        // tools,
        prompt,
        onFinish: async () => {
          // await sseClient.close();
        },
        onError: async (error) => {
          // await sseClient.close();
        },
      });

      return response.pipeUIMessageStreamToResponse(res, {
        onError: (error) => {
          // Error messages are masked by default for security reasons.
          // If you want to expose the error message to the client, you can do so here:
          return error instanceof Error ? error.message : String(error);
        },
      });
    } catch (error) {
      return new Response('Internal Server Error', { status: 500 });
    }
  }
}
