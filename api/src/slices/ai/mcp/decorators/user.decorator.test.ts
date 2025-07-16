// @scope:api
// @slice:mcp
// @layer:presentation
// @type:test

import { Injectable } from '@nestjs/common';
import { Tool } from '#ai/mcp/decorators';
import { Context } from '#ai/mcp/interfaces';
import { z } from 'zod';
import { RequestWithUser } from '#ai/mcpTest/domain';
import { getUserFromRequest, getUserTeamId, userHasRole } from '#ai/mcp/utils/user.utils';
import { RoleTypes } from '#user/user/domain';

@Injectable()
export class UserDecoratorTestTools {
  @Tool({
    name: 'TestUserUtils',
    description: 'Test the user utility functions',
    parameters: z.object({}),
  })
  async testUserUtils(params: any, context: Context, httpRequest: RequestWithUser) {
    const user = getUserFromRequest(httpRequest);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            user: user,
            hasUser: !!user,
            userEmail: user?.email,
            userTeams: user?.teams?.length || 0,
            userRoles: user?.roles || [],
            teamId: getUserTeamId(httpRequest),
            isAdmin: userHasRole(httpRequest, RoleTypes.Admin),
          }),
        },
      ],
    };
  }

  @Tool({
    name: 'GetUserInfo',
    description: 'Get detailed user information',
    parameters: z.object({}),
  })
  async getUserInfo(params: any, context: Context, httpRequest: RequestWithUser) {
    const user = getUserFromRequest(httpRequest);

    if (!user) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: 'User not authenticated',
              success: false,
            }),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              verified: user.verified,
              roles: user.roles,
              teams: user.teams,
            },
          }),
        },
      ],
    };
  }
}
