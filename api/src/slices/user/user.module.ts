import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ApiKeyModule } from './apiKey/apiKey.module';
import { TeamModule } from './team/team.module';
import { UserModule as UsersUsersModule } from './user/user.module';
// Set Global AuthGuard
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './user.guard';
import { AwsModule } from '#aws';
import { MailModule } from './mail/mail.module';
import { AuthGuard } from './auth/auth.guard';
import { ApiKeysGuard } from './apiKey/apiKey.guard';

@Module({
  imports: [UsersUsersModule, AuthModule, ApiKeyModule, AwsModule, TeamModule, MailModule],
  providers: [
    AuthGuard,
    ApiKeysGuard,
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
    UserGuard,
  ],
  exports: [UsersUsersModule, AuthModule, ApiKeyModule, TeamModule, MailModule, AuthGuard, ApiKeysGuard, UserGuard],
})
export class UserModule {}
