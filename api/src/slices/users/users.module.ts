import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ApiKeysModule } from './apiKeys/apiKeys.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule as UsersUsersModule } from './users/users.module';
// Set Global AuthGuard
import { APP_GUARD } from '@nestjs/core';
import { UsersGuard } from './users.guard';
import { AwsModule } from '#aws';
import { MailsModule } from './mails/mails.module';
@Module({
  imports: [UsersUsersModule, AuthModule, ApiKeysModule, AwsModule, TeamsModule, MailsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UsersGuard,
    },
  ],
  exports: [UsersUsersModule, AuthModule, ApiKeysModule, TeamsModule, MailsModule],
})
export class UsersModule {}
