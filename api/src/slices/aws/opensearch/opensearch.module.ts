import { Module, Global } from '@nestjs/common';
import { OpensearchRepository } from './opensearch.repository';

@Global()
@Module({
  providers: [OpensearchRepository],
  exports: [OpensearchRepository],
})
export class OpensearchModule {}
