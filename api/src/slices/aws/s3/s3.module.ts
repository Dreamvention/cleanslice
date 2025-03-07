import { Module } from '@nestjs/common';
import { S3Repository } from './data/repositories';

@Module({
  providers: [S3Repository],
  exports: [S3Repository],
})
export class S3Module {}
