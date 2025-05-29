import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthGateway, IAuthData, UsersErrors, ICreateAuthData } from '../domain';
import { authConfig } from '../auth.config';
import { IUserData, IUsersGateway, ICreateUserData, RoleTypes } from '#users/users';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { MailService } from '#users/mail';
import { PrismaService } from '#prisma';

@Injectable()
export class BasicAuthGateway implements IAuthGateway {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersGateway: IUsersGateway,
    private mailService: MailService,
  ) {}

  async login(email: string, password: string): Promise<IAuthData> {
    const { data: users } = await this.usersGateway.getUsers({ email });
    const user = users[0];

    if (!user) {
      throw new UsersErrors.UserNotExistsError();
    }

    // Get the user with password from Prisma directly since it's not exposed in the gateway
    const userWithPassword = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        password: true,
      },
    });

    if (!userWithPassword?.password) {
      throw new UsersErrors.UserNotAuthorizedError();
    }

    const isPasswordValid = await bcrypt.compare(password, userWithPassword.password);
    if (!isPasswordValid) {
      throw new UsersErrors.UserNotAuthorizedError();
    }

    if (user.banned) {
      throw new UsersErrors.UserBannedError();
    }

    if (!user.emailConfirmed) {
      throw new UsersErrors.UserNotVerifiedError();
    }

    const team = await this.prisma.team.findFirst({ where: { userId: user.id } });
    const tokens = await this.createTokens(user);

    return {
      id: user.id,
      teamId: team?.id,
      ...tokens,
    };
  }

  async register(data: ICreateAuthData & ICreateUserData): Promise<IUserData> {
    const { data: existingUsers } = await this.usersGateway.getUsers({ email: data.email });
    if (existingUsers.length > 0) {
      throw new UsersErrors.UserExistsError(`User ${data.email} already exists`);
    }

    // Generate confirmation token
    const confirmationToken = randomBytes(32).toString('hex');
    const confirmationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Hash password
    const password = await bcrypt.hash(data.password, 10);

    const user = await this.usersGateway.createUser(data);
    if (!user) {
      throw new UsersErrors.UserNotCreatedError();
    }

    // Then update the auth-specific fields directly with Prisma
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: password,
        emailConfirmed: false,
        emailConfirmationToken: confirmationToken,
        emailConfirmationExpiresAt: confirmationExpires,
      },
    });

    // Send confirmation email
    await this.mailService.sendConfirmationEmail(user.email, confirmationToken);

    // Return updated user data through the gateway
    return this.usersGateway.getUser(user.id);
  }

  async confirm(token: string, email: string): Promise<void> {
    const { data: users } = await this.usersGateway.getUsers({ email });
    const user = users[0];

    if (!user) {
      throw new UsersErrors.UserNotExistsError();
    }

    // Get user with confirmation data from Prisma
    const userWithConfirmation = await this.prisma.user.findFirst({
      where: {
        id: user.id,
        emailConfirmationToken: token,
        emailConfirmationExpiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!userWithConfirmation) {
      throw new UsersErrors.UserNotVerifiedError('Invalid or expired confirmation token');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailConfirmed: true,
        emailConfirmationToken: null,
        emailConfirmationExpiresAt: null,
      },
    });
  }

  async resendConfirm(email: string): Promise<void> {
    const { data: users } = await this.usersGateway.getUsers({ email });
    const user = users[0];

    if (!user) {
      throw new UsersErrors.UserNotExistsError();
    }

    if (user.emailConfirmed) {
      throw new UsersErrors.UserAlreadyVerifiedError();
    }

    // Generate new confirmation token
    const confirmationToken = randomBytes(32).toString('hex');
    const confirmationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailConfirmationToken: confirmationToken,
        emailConfirmationExpiresAt: confirmationExpires,
      },
    });

    // Send new confirmation email
    await this.mailService.sendConfirmationEmail(user.email, confirmationToken);
  }

  async refreshToken(refreshToken: string): Promise<IAuthData> {
    try {
      const payload = await this.verifyToken(refreshToken);
      const user = await this.usersGateway.getUser(payload.id);

      if (!user) {
        throw new UnauthorizedException();
      }

      const team = await this.prisma.team.findFirst({ where: { userId: user.id } });
      const tokens = await this.createTokens(user);

      return {
        id: user.id,
        teamId: team?.id,
        ...tokens,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async createTokens(user: IUserData): Promise<IAuthData> {
    const payload = { id: user.id, email: user.email };

    return {
      id: user.id,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
      }),
    };
  }

  async verifyToken(token: string): Promise<{ id: string; email: string }> {
    return await this.jwtService.verifyAsync(token, {
      secret: authConfig.secret,
    });
  }
}
