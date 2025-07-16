import { Module } from '@nestjs/common';
import { ApiKeyGateway, ApiKeyMapper } from '../../../user/apiKey/data';
import { IApiKeyGateway, ApiKeyService } from '../../../user/apiKey/domain';
import { ApiKeysController } from './apiKeys.controller';
import { ApiKeysGuard } from './apiKeys.guard';
import { TeamModule } from '../../../user/team/team.module';

@Module({
  imports: [TeamModule],
  controllers: [ApiKeysController],
  providers: [
    ApiKeyService,
    ApiKeysGuard,
    {
      provide: IApiKeyGateway,
      useClass: ApiKeyGateway,
    },
    ApiKeyMapper,
  ],
  exports: [ApiKeyService, ApiKeysGuard],
})
export class ApiKeysModule {}
