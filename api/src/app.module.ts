import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { SlicesModule } from './registerSlices';
import { FilesModule } from './slices/files/files.module';
import { UserModule } from './slices/user/user.module';
import { HealthModule } from './slices/health/health.module';
import { AiModule } from './slices/ai/ai.module';
// import { RedisModule } from './slices/redis/redis.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    FilesModule,
    UserModule,
    HealthModule,
    AiModule,
    // RedisModule,
  ],
})
export class AppModule {}
