// @scope:api
// @slice:user/user
// @layer:presentation
// @type:tool

import { Injectable } from '@nestjs/common';
import { Tool, Resource, Context } from '#ai/mcp';
import { z } from 'zod';
import { Progress } from '@modelcontextprotocol/sdk/types';
import { Request } from 'express';
import { User } from '#user/auth/user.decorator';
import { User as PrismaUser } from '@prisma/client';
import { IUserGateway } from './domain';
import { FilterUserDto } from './dtos';
import { Team } from '#user/team/team.decorator';

@Injectable()
export class UserTool {
  constructor(private userGateway: IUserGateway) { }

  @Tool({
    name: 'getUsers',
    description: 'Retrieves users based on provided filters. If no search parameter is provided, returns all users.',
    parameters: z.object({
      search: z.string().nullable(),
      role: z.string().nullable(),
      status: z.string().nullable(),
      page: z.number().nullable(),
      perPage: z.number().nullable(),
    }),
  })
  async getUsers(query: FilterUserDto, context: Context, request: Request) {
    const users = await this.userGateway.getUsers(query);
    return {
      content: [{ type: 'text', text: JSON.stringify(users) }],
    };
  }

  @Tool({
    name: 'getUser',
    description: 'Retrieves a specific user by ID.',
    parameters: z.object({
      id: z.string().describe('The ID of the user to retrieve'),
    }),
  })
  async getUser(parameters: { id: string }, context: Context, request: Request) {
    const user = await this.userGateway.getUser(parameters.id);
    return {
      content: [{ type: 'text', text: JSON.stringify(user) }],
    };
  }

  @Tool({
    name: 'createUser',
    description: 'Creates a new user.',
    parameters: z.object({
      name: z.string().describe('User name'),
      email: z.string().describe('User email address'),
      roles: z.array(z.string()).describe('User roles'),
    }),
  })
  async createUser(parameters: any, context: Context, request: Request) {
    const user = await this.userGateway.createUser(parameters);
    return {
      content: [{ type: 'text', text: JSON.stringify(user) }],
    };
  }

  @Tool({
    name: 'updateUser',
    description: 'Updates an existing user.',
    parameters: z.object({
      id: z.string().describe('The ID of the user to update'),
      name: z.string().nullable().describe('User name'),
      email: z.string().nullable().describe('User email address'),
      roles: z.array(z.string()).nullable().describe('User roles'),
    }),
  })
  async updateUser(parameters: any, context: Context, request: Request) {
    const user = await this.userGateway.updateUser(parameters.id, parameters);
    return {
      content: [{ type: 'text', text: JSON.stringify(user) }],
    };
  }

  @Tool({
    name: 'deleteUser',
    description: 'Deletes a user by ID.',
    parameters: z.object({
      id: z.string().describe('The ID of the user to delete'),
    }),
  })
  async deleteUser(parameters: { id: string }, context: Context, request: Request) {
    const result = await this.userGateway.deleteUser(parameters.id);
    return {
      content: [{ type: 'text', text: JSON.stringify({ success: result }) }],
    };
  }
}
