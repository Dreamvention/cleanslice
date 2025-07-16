import { PrismaService } from '#prisma';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ApiKeyService } from '#user/apiKey/domain/apiKey.service';
import { ITeamData } from '#user/team/domain';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MCPAuthService {
  public constructor(
    private readonly db: PrismaService,
    private readonly apiKeysService: ApiKeyService,
    private jwtService: JwtService,
  ) {}

  async getTeamFromRequest(request: Request): Promise<ITeamData | undefined> {
    const key = this.extractApiKeyFromHeader(request);
    if (key) {
      const apiKey = await this.apiKeysService.useApiKey(key, request.headers.origin);
      return apiKey.team;
    }
    return;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    return request.headers['api-key'] as string;
  }
}
