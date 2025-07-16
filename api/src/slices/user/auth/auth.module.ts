import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { BasicAuthGateway, CognitoAuthGateway } from './data';
import { IAuthGateway } from './domain';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from './auth.config';
import { MailModule } from '../mail/mail.module';
import { PrismaModule } from '#prisma/prisma.module';
import { CognitoModule } from '#aws/cognito/cognito.module';
import { ApiKeyModule } from '../apiKey/apiKey.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role.guard';

@Module({
  imports: [PrismaModule, JwtModule.register(authConfig), UserModule, ApiKeyModule, CognitoModule, MailModule],
  providers: [
    {
      provide: IAuthGateway,
      useClass: process.env.AUTH_TYPE === 'cognito' ? CognitoAuthGateway : BasicAuthGateway,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  controllers: [AuthController],
  exports: [IAuthGateway],
})
export class AuthModule {}
