import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { SlicesModule } from './registerSlices';
import { FilesModule } from './slices/files/files.module';
import { UsersModule } from './slices/users/users.module';
import { HealthModule } from './slices/health/health.module';
// import { RedisModule } from './slices/redis/redis.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    FilesModule,
    UsersModule,
    HealthModule,
    // RedisModule,
  ],
})
export class AppModule {}
