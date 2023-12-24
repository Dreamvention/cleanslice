import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SlicesModule } from '../registerSlices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    SlicesModule.registerAsync(),
  ],
})
export class AppModule {}
