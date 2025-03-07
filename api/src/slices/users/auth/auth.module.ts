import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { IAuthGateway } from './domain';
import { AuthGateway } from './data';
import { AuthController } from './auth.controller';
import { authConfig } from './auth.config';
import { UsersModule } from '../users/users.module';
import { ApiKeysModule } from '../apiKeys/apiKeys.module';
import { RolesGuard } from './roles.guard';
import { PrismaModule } from '#prisma/prisma.module';
import { CognitoModule } from '#aws/cognito/cognito.module';

@Module({
  imports: [PrismaModule, JwtModule.register(authConfig), UsersModule, ApiKeysModule, CognitoModule],
  providers: [
    { provide: IAuthGateway, useClass: AuthGateway },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
