import { DynamicModule, Module } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Module({})
export class SlicesModule {
  static async registerAsync(): Promise<DynamicModule> {
    const slices = fs.readdirSync(path.resolve(__dirname, './slices'));
    const result = [];

    for (const slice of slices) {
      if (fs.existsSync(path.resolve(__dirname, `./slices/${slice}/${slice}.module.js`))) {
        const className = `${slice.charAt(0).toUpperCase() + slice.slice(1)}Module`;
        const module = await import(path.resolve(__dirname, `./slices/${slice}/${slice}.module`));
        result.push(module[className]);
      } else {
        console.log('RegisterSlizes: can not load slice: ', slice);
      }
    }

    return {
      module: SlicesModule,
      imports: result,
      exports: result,
    };
  }
}
