import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthenticationGuard } from '#aws/cognito';
import { ApiKeysGuard } from '#users/apiKeys';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private readonly authenticationGuard: AuthenticationGuard, private readonly apiKeysGuard: ApiKeysGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Check Cognito Guard
      await this.authenticationGuard.canActivate(context);
      return true;
    } catch (e) {
      // Cognito failed, so let's check the API Key Guard
      let response = false;
      try {
        response = await this.apiKeysGuard.canActivate(context);
      } catch (e) {
        // API Key failed as well
        throw new UnauthorizedException();
      }
      if (!response) {
        throw new UnauthorizedException();
      }
      return true;
    }
  }
}
