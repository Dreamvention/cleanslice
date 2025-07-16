// @scope:api
// @slice:mcp
// @layer:presentation
// @type:utils

import { IUserData, RoleTypes } from '#user/user/domain';
import { RequestWithUser } from '#ai/mcpTest/domain';

/**
 * Utility function to extract user data from MCP tool httpRequest.
 * Use this instead of @User() decorator in MCP tools.
 *
 * @param httpRequest - The httpRequest parameter from MCP tool method
 * @returns IUserData or null if user is not authenticated
 *
 * @example
 * ```typescript
 * @Tool({
 *   name: 'GetMyAgents',
 *   description: 'Returns agents for the current user',
 *   parameters: z.object({}),
 * })
 * async getMyAgents(params: any, context: Context, httpRequest: RequestWithUser) {
 *   const user = getUserFromRequest(httpRequest);
 *   if (!user) {
 *     return { content: [{ type: 'text', text: JSON.stringify({ error: 'Not authenticated' }) }] };
 *   }
 *
 *   const teamId = user.teams[0]?.id;
 *   // ... rest of the logic
 * }
 * ```
 */
export function getUserFromRequest(httpRequest: RequestWithUser): IUserData | null {
  if (httpRequest?.user) {
    return httpRequest.user as IUserData;
  }

  // Fallback to cognito_user if available
  if (httpRequest?.cognito_user) {
    return {
      id: '',
      name: '',
      email: httpRequest.cognito_user.email,
      teams: [],
      teamUsers: [],
      verified: false,
      roles: [],
      banned: false,
      emailConfirmed: false,
    } as IUserData;
  }

  return null;
}

/**
 * Utility function to get user's primary team ID.
 *
 * @param httpRequest - The httpRequest parameter from MCP tool method
 * @returns teamId or null if user has no teams
 */
export function getUserTeamId(httpRequest: RequestWithUser): string | null {
  const user = getUserFromRequest(httpRequest);
  return user?.teams?.[0]?.id || null;
}

/**
 * Utility function to check if user has specific role.
 *
 * @param httpRequest - The httpRequest parameter from MCP tool method
 * @param role - The role to check for
 * @returns boolean indicating if user has the role
 */
export function userHasRole(httpRequest: RequestWithUser, role: RoleTypes): boolean {
  const user = getUserFromRequest(httpRequest);
  return user?.roles?.includes(role) || false;
}
