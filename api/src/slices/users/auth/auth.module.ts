import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { BasicAuthGateway, CognitoAuthGateway } from './data';
import { IAuthGateway } from './domain';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from './auth.config';
import { MailModule } from '#users/mail';
import { PrismaModule } from '#prisma/prisma.module';
import { CognitoModule } from '#aws/cognito/cognito.module';
import { ApiKeysModule } from '../apiKeys/apiKeys.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [PrismaModule, JwtModule.register(authConfig), UsersModule, ApiKeysModule, CognitoModule, MailModule],
  providers: [
    {
      provide: IAuthGateway,
      useClass: process.env.AUTH_TYPE === 'cognito' ? CognitoAuthGateway : BasicAuthGateway,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
  exports: [IAuthGateway],
})
export class AuthModule {}
