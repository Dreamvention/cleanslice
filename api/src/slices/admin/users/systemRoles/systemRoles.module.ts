import { Module } from '@nestjs/common';
import { SystemRolesController } from './systemRoles.controller';
import { PrismaModule } from '#prisma';

@Module({
  imports: [PrismaModule],
  providers: [],
  controllers: [SystemRolesController],
  exports: [PrismaModule],
})
export class SystemRolesModule {}
