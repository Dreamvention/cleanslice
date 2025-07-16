import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { IUserGateway, UserService } from './domain';
import { UserGateway, UserMapper } from './data';
import { ApiKeyModule } from '../apiKey/apiKey.module';
import { PrismaModule } from '#prisma';
import { UserTool } from './user.tool';

@Module({
  imports: [PrismaModule],
  providers: [{ provide: IUserGateway, useClass: UserGateway }, UserMapper, UserService, UserTool],
  controllers: [UserController],
  exports: [{ provide: IUserGateway, useClass: UserGateway }, UserMapper, UserService],
})
export class UserModule {}
