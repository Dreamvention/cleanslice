import { Injectable, UnauthorizedException, NotAcceptableException } from '@nestjs/common';
import { IAuthGateway } from '../../domain/gateways';
import { IAuthData } from '../../domain/entities';
import { IUserData } from '../../../users/domain/entities';
import { IUsersGateway } from '../../../users/domain/gateways';
import { PrismaService } from 'src/slices/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { authConfig } from '../../auth.config';

@Injectable()
export class AuthGateway implements IAuthGateway {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private usersGateway: IUsersGateway) {}

  async login(email: string, password: string): Promise<IAuthData> {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user || user?.password !== password) {
      throw new UnauthorizedException();
    }

    return this.createTokens(user);
  }
  async register(data: IUserData): Promise<IAuthData> {
    const userExists = await this.prisma.user.findFirst({ where: { email: data.email } });
    if (userExists) {
      throw new NotAcceptableException('User already exists');
    }

    const user = await this.usersGateway.createUser(data);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.createTokens(user);
  }

  async refreshToken(refreshToken: string): Promise<IAuthData> {
    const { id, email } = await this.verifyToken(refreshToken);

    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user || user.email !== email) {
      throw new UnauthorizedException();
    }

    return this.createTokens(user);
  }

  async createTokens(user: IUserData) {
    const payload = { sub: user.id, username: user.email };

    return {
      id: user.id,
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
      }),
    };
  }

  async verifyToken(token: string): Promise<{ id: number; email: string }> {
    return await this.jwtService.verifyAsync(token, {
      secret: authConfig.secret,
    });
  }
}
