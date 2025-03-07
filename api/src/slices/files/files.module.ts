import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService, IFilesGateway } from './domain';
import { FilesGateway, FileMapper } from './data';
import { AwsModule } from '#aws';
import { PrismaModule } from '#prisma';

@Module({
  imports: [AwsModule, PrismaModule],
  providers: [{ provide: IFilesGateway, useClass: FilesGateway }, FilesService, FileMapper],
  controllers: [FilesController],
  exports: [{ provide: IFilesGateway, useClass: FilesGateway }, FilesService, FileMapper],
})
export class FilesModule {}
