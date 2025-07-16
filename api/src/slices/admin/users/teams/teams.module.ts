import { Module } from '@nestjs/common';
import { TeamGateway, TeamMapper } from '../../../user/team/data';
import { ITeamGateway, TeamService } from '../../../user/team/domain';
import { TeamsController } from './teams.controller';

@Module({
  controllers: [TeamsController],
  providers: [
    TeamService,
    {
      provide: ITeamGateway,
      useClass: TeamGateway,
    },
    TeamMapper,
  ],
  exports: [TeamService],
})
export class TeamsModule {}
