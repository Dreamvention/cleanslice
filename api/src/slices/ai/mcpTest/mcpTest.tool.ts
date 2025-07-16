// @scope:api
// @slice:mcp
// @layer:presentation
// @type:tool
import { Injectable } from '@nestjs/common';
import { Tool, Resource, Context, Public } from '#ai/mcp';
import { z } from 'zod';
import { Progress } from '@modelcontextprotocol/sdk/types';
import { Request } from 'express';
import { User as PrismaUser } from '@prisma/client';

interface RequestWithUser extends Request {
  user?: {
    id: string;
    email: string;
    teamId?: string;
  };
}

interface UserWithTeam extends PrismaUser {
  teamId?: string;
}

@Injectable()
export class McpTestTool {
  constructor() {}

  @Public()
  @Tool({
    name: 'ping',
    description: 'Simple ping tool that does not require authentication',
    parameters: z.object({
      message: z.string().optional(),
    }),
  })
  async ping(params: { message?: string }, context: Context) {
    const { message = 'pong' } = params;
    return {
      content: [{ type: 'text', text: `Ping: ${message}` }],
    };
  }

  @Tool({
    name: 'hello-world',
    description: 'Returns a greeting and simulates a long operation with progress updates',
    parameters: z.object({
      name: z.string().default('World'),
    }),
  })
  async sayHello(params: { name?: string }, context: Context, request: RequestWithUser) {
    const { name = 'World' } = params;
    // User is already authenticated by the guard
    const greeting = `Hello, ${name}! You are authenticated as: ${request.user?.email}`;

    const totalSteps = 5;
    for (let i = 0; i < totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Send a progress update.
      await context.reportProgress({
        progress: (i + 1) * 20,
        total: 100,
      } as Progress);
    }

    return {
      content: [{ type: 'text', text: greeting }],
    };
  }

  @Resource({
    uri: 'mcp://hello-world/{userName}',
    name: 'Hello World',
    description: 'A simple greeting resource',
    mimeType: 'text/plain',
  })
  // Different from the SDK, we put the parameters and URI in the same object.
  async getCurrentSchema(params: { uri: string; userName: string }) {
    const { uri, userName } = params;
    return {
      content: [
        {
          uri,
          text: `User is ${userName}`,
          mimeType: 'text/plain',
        },
      ],
    };
  }
}
