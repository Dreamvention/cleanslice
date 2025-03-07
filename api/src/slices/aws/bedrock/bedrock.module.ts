import { Module } from '@nestjs/common';
import { BedrockRepository } from './data/repositories';

@Module({
  providers: [BedrockRepository],
  exports: [BedrockRepository],
})
export class BedrockModule {}
