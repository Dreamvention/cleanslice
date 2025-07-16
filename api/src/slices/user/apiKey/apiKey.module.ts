import { Module, forwardRef } from '@nestjs/common';
import { ApiKeyGateway, ApiKeyMapper } from './data';
import { IApiKeyGateway, ApiKeyService } from './domain';
import { PrismaModule } from 'src/slices/prisma/prisma.module';
import { ApiKeyController } from './apiKey.controller';
import { TeamModule } from '../team/team.module';
import { ApiKeysGuard } from './apiKey.guard';

@Module({
  imports: [PrismaModule, TeamModule],
  providers: [{ provide: IApiKeyGateway, useClass: ApiKeyGateway }, ApiKeyService, ApiKeyMapper, ApiKeysGuard],
  controllers: [ApiKeyController],
  exports: [ApiKeyService, ApiKeysGuard],
})
export class ApiKeyModule {}
