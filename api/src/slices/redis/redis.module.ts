import { Module } from '@nestjs/common';
import { RedisRepository } from './redis.repository';

@Module({
  imports: [],
  providers: [RedisRepository],
  exports: [RedisRepository],
})
export class RedisModule {}
