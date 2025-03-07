import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { IUsersGateway, UsersService } from './domain';
import { UsersGateway, UserMapper } from './data';
import { ApiKeysModule } from '../apiKeys/apiKeys.module';
import { PrismaModule } from '#prisma';

@Module({
  imports: [PrismaModule],
  providers: [{ provide: IUsersGateway, useClass: UsersGateway }, UserMapper, UsersService],
  controllers: [UsersController],
  exports: [{ provide: IUsersGateway, useClass: UsersGateway }, UserMapper, UsersService],
})
export class UsersModule {}
