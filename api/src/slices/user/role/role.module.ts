import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { IRoleGateway, RoleService } from './domain';
import { RoleGateway, RoleMapper } from './data';
import { PrismaModule } from '#prisma';

@Module({
  imports: [PrismaModule],
  providers: [{ provide: IRoleGateway, useClass: RoleGateway }, RoleMapper, RoleService],
  controllers: [RoleController],
  exports: [{ provide: IRoleGateway, useClass: RoleGateway }, RoleMapper, RoleService],
})
export class RoleModule {}
