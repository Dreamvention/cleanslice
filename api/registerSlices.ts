import { DynamicModule, Module } from '@nestjs/common';
import * as fs from 'fs';

@Module({})
export class SlicesModule {
  static async registerAsync(): Promise<DynamicModule> {
    const slices = fs.readdirSync('./src/slices');
    const result = [];

    for (const slice of slices) {
      if (fs.existsSync(`./slices/${slice}/${slice}.module.ts`)) {
        const className = `${slice.charAt(0).toUpperCase() + slice.slice(1)}Module`;
        const module = await import(`./src/slices/${slice}/${slice}.module`);
        result.push(module[className]);
      }
    }

    return {
      module: SlicesModule,
      imports: result,
      exports: result,
    };
  }
}
