import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { IUsersGateway } from './domain/gateways';
import { UsersGateway } from './data/gateways';
import { PrismaModule } from 'src/slices/prisma/prisma.module';
import { UserMapper } from './data/mappers';

@Module({
  imports: [PrismaModule],
  providers: [{ provide: IUsersGateway, useClass: UsersGateway }, UserMapper],
  controllers: [UsersController],
  exports: [{ provide: IUsersGateway, useClass: UsersGateway }],
})
export class UsersModule {}
