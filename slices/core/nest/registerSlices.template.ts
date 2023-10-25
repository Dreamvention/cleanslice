import { DynamicModule, Module } from '@nestjs/common';
<% importSlices %>

@Module({})
export class SlicesModule {
  static async registerAsync(): Promise<DynamicModule> {
    const result = [];
    <% pushSlices %>
    return {
      module: SlicesModule,
      imports: result,
      exports: result,
    };
  }
}
