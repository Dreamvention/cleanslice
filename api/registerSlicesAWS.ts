import { DynamicModule, Module } from '@nestjs/common';
import { UsersSlices } from 'slices-users-api';


@Module({})
export class SlicesModule {
  static async registerAsync(): Promise<DynamicModule> {
    const result = [];
    result.push(...UsersSlices);

    return {
      module: SlicesModule,
      imports: result,
      exports: result,
    };
  }
}
