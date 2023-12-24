import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule as UsersUsersModule } from './users/users.module';

@Module({
  imports: [UsersUsersModule, AuthModule],
})
export class UsersModule {}
