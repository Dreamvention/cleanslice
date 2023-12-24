import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from 'src/slices/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
