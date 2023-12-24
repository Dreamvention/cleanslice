import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { PrismaModule } from 'src/slices/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SubscriptionsController],
})
export class SubscriptionsModule {}
