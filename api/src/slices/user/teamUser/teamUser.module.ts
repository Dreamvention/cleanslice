import { Module } from '@nestjs/common';
import { TeamUserController } from './teamUser.controller';
import { ITeamUserGateway, TeamUserService } from './domain';
import { TeamUserGateway, TeamUserMapper } from './data';
import { PrismaModule } from '#prisma';

@Module({
  imports: [PrismaModule],
  providers: [{ provide: ITeamUserGateway, useClass: TeamUserGateway }, TeamUserMapper, TeamUserService],
  controllers: [TeamUserController],
  exports: [TeamUserService, TeamUserMapper],
})
export class TeamUserModule {}
