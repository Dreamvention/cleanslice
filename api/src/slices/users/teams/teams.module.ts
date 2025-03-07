import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { ITeamsGateway, TeamsService } from './domain';
import { TeamsGateway, TeamMapper } from './data';
import { PrismaModule } from '#prisma';

@Module({
  imports: [PrismaModule],
  providers: [{ provide: ITeamsGateway, useClass: TeamsGateway }, TeamMapper, TeamsService],
  controllers: [TeamsController],
  exports: [TeamsService, TeamMapper],
})
export class TeamsModule {}
