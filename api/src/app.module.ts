import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SlicesModule } from '../registerSlices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    PrismaModule,
    SlicesModule.registerAsync(),
  ],
})
export class AppModule {}
