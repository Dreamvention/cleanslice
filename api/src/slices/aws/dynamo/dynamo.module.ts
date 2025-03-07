import { Module, Global } from '@nestjs/common';
import { DynamoRepository } from './dynamo.repository';

@Global()
@Module({
  providers: [DynamoRepository],
  exports: [DynamoRepository],
})
export class DynamoModule {}
