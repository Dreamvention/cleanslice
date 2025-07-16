// @scope:api
// @slice:mcp
// @layer:presentation
// @type:guard

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, forwardRef, Inject } from '@nestjs/common';
import { Request } from 'express';
import { UserGuard } from '#user/user.guard';
import { ApiKeysGuard } from '#user/apiKey/apiKey.guard';
import { IUserData, UserService } from '#user/user/domain';

interface RequestWithCognito extends Request {
  cognito_user?: {
    email: string;
  };
  user?: IUserData;
}

@Injectable()
export class McpAuthGuard implements CanActivate {
  constructor(
    private readonly UserGuard: UserGuard,
    @Inject(forwardRef(() => ApiKeysGuard))
    private readonly apiKeysGuard: ApiKeysGuard,
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithCognito>();

    try {
      // Try Cognito authentication first
      return true; // TODO: remove this
      await this.UserGuard.canActivate(context);

      // After successful Cognito authentication, set up request.user
      if (request.cognito_user?.email) {
        const user = await this.usersService.getUserByEmail(request.cognito_user.email);

        if (user) {
          // Transform to IUserData format
          request.user = user;
        }
      }

      return true;
    } catch (e) {
      // Cognito failed, try API key authentication
      try {
        const response = await this.apiKeysGuard.canActivate(context);
        if (response) {
          return true;
        }
      } catch (apiKeyError) {
        // Both authentication methods failed
        throw new UnauthorizedException('Authentication required');
      }
    }

    throw new UnauthorizedException('Authentication required');
  }
}
