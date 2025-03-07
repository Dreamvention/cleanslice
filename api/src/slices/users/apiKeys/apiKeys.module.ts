import { Module, forwardRef } from '@nestjs/common';
import { ApiKeysGateway, ApiKeyMapper } from './data';
import { IApiKeysGateway, ApiKeysService } from './domain';
import { PrismaModule } from 'src/slices/prisma/prisma.module';
import { ApiKeysController } from './apiKeys.controller';
import { TeamsModule } from '#users/teams';
import { ApiKeysGuard } from './apiKeys.guard';

@Module({
  imports: [PrismaModule, TeamsModule],
  providers: [{ provide: IApiKeysGateway, useClass: ApiKeysGateway }, ApiKeysService, ApiKeyMapper, ApiKeysGuard],
  controllers: [ApiKeysController],
  exports: [ApiKeysService, ApiKeysGuard],
})
export class ApiKeysModule {}
