import { Module } from '@nestjs/common';
import { LambdaRepository } from './lambda.repository';

@Module({
  providers: [LambdaRepository],
  exports: [LambdaRepository],
})
export class LambdaModule {}
