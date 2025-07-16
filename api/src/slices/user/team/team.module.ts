import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { ITeamGateway, TeamService } from './domain';
import { TeamGateway, TeamMapper } from './data';
import { PrismaModule } from '#prisma';

@Module({
  imports: [PrismaModule],
  providers: [{ provide: ITeamGateway, useClass: TeamGateway }, TeamMapper, TeamService],
  controllers: [TeamController],
  exports: [TeamService, TeamMapper],
})
export class TeamModule {}
