import { Injectable } from '@nestjs/common';
import { Cognito, UserNotConfirmedException, NotAuthorizedException } from '#aws/cognito';
import { IAuthGateway, IAuthData, UsersErrors, ICreateAuthData } from '../domain';
import { authConfig } from '../auth.config';
import { IUserData, IUsersGateway, ICreateUserData, RoleTypes } from '#users/users';
import { PrismaService } from '#prisma';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CognitoAuthGateway implements IAuthGateway {
  constructor(
    private prisma: PrismaService,
    private cognito: Cognito,
    private jwtService: JwtService,
    private usersGateway: IUsersGateway,
  ) {}

  async login(email: string, password: string): Promise<IAuthData> {
    let response;
    let user;
    try {
      response = await this.cognito.authenticateUser({ name: email, password });
    } catch (e) {
      if (e instanceof UserNotConfirmedException) throw new UsersErrors.UserNotConfirmedError();
      if (e instanceof NotAuthorizedException) throw new UsersErrors.UserNotAuthorizedError();
      throw new UsersErrors.UserNotExistsError();
    }

    if (!response) {
      throw new UsersErrors.UserNotAuthorizedError();
    }
    const users = await this.usersGateway.getUsers({ email });

    if (users.data.length) {
      user = users.data[0];
    }

    if (!user) {
      const newUser = await this.usersGateway.createUser({
        name: email.split('@')[0],
        email: email,
        roles: [RoleTypes.User],
      });

      user = newUser;
    }

    if (user.banned) {
      throw new UsersErrors.UserBannedError();
    }

    if (!user.verified) {
      throw new UsersErrors.UserNotVerifiedError();
    }

    // const team = await this.prisma.team.findFirst({ where: { userId: user.id } });

    return {
      id: user.id,
      // teamId: team ? team.id : undefined,
      accessToken: response.IdToken,
      refreshToken: response.RefreshToken,
    };
  }
  async register(data: ICreateAuthData & ICreateUserData): Promise<IUserData> {
    const userExists = await this.prisma.user.findFirst({ where: { email: data.email } });
    if (userExists) {
      throw new UsersErrors.UserExistsError(`User ${data.email} already exists`);
    }

    try {
      await this.cognito.registerUser({ name: data.email, email: data.email, password: data.password });
    } catch (e) {
      if (e.message == 'User is not confirmed') throw new UsersErrors.UserNotConfirmedError();
      throw e;
    }

    const user = await this.usersGateway.createUser(data);
    if (!user) {
      throw new UsersErrors.UserNotCreatedError();
    }

    return user;
    // return this.createTokens(user);
    // const response = await this.cognito.authenticateUser({ name: data.email, password: data.password });
    // return {
    //   id: user.id,
    //   accessToken: response.IdToken,
    //   refreshToken: response.RefreshToken,
    // };
  }

  async confirm(name: string, code: string) {
    await this.cognito.confirmSignUpByCode(name, code);
  }

  async resendConfirm(name: string) {
    await this.cognito.resendConfirmationCode(name);
  }

  async refreshToken(refreshToken: string): Promise<IAuthData> {
    const response = await this.cognito.refreshToken(refreshToken);
    return {
      id: '', //user.id,
      accessToken: response.IdToken,
      refreshToken: response.RefreshToken,
    };
    // const { id, email } = await this.verifyToken(refreshToken);

    // const user = await this.prisma.user.findFirst({ where: { id } });

    // if (!user || user.email !== email) {
    //   throw new UnauthorizedException();
    // }

    // return this.createTokens(user);
  }

  async createTokens(user: IUserData) {
    const payload = { id: user.id, username: user.email };

    return {
      id: user.id,
      accessToken: await this.jwtService.signAsync(payload),
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
