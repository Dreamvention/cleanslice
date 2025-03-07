import { ICreateFileData, IFileData, IFilterFile, IFilesGateway, IUploadFileData } from '../domain';
import { FileMapper } from './file.mapper';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { Document } from 'langchain/document';
import { PrismaService } from '#prisma';
import { S3Repository } from '#aws';

@Injectable()
export class FilesGateway implements IFilesGateway {
  constructor(
    private readonly s3Repository: S3Repository,
    private readonly prisma: PrismaService,
    private readonly map: FileMapper,
  ) {}
  async getSignedUrl(teamId: string, key: string, contentType: string): Promise<{ url: string; path: string }> {
    const path = this.map.toPath(teamId, key);
    console.log('getSignedUrl', path);
    const url = await this.s3Repository.getSignedUrl(path, contentType);
    console.log('getSignedUrl url', url);
    return {
      url: (process.env.CORS_ENDPOINT ? url.replace(process.env.S3_ENDPOINT, process.env.CORS_ENDPOINT) : '') + url,
      path,
    };
  }

  async createFile(file: ICreateFileData): Promise<IFileData> {
    const data = this.map.toCreate(file);
    const result = await this.prisma.file.create({
      data,
    });
    return this.map.toData(result);
  }

  async uploadFile(file: IUploadFileData): Promise<IFileData> {
    const data = this.map.toCreate(file);
    await this.s3Repository.uploadFileMultipart(data.path, data.contentType, file.dataBuffer);

    const result = await this.prisma.file.create({
      data,
    });
    return this.map.toData(result);
  }

  async getFiles(filter: IFilterFile): Promise<IFileData[]> {
    const result = await this.prisma.file.findMany({
      where: {
        teamId: filter.teamId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return result.map((file) => this.map.toData(file));
  }

  async getFile(id: string): Promise<IFileData | undefined> {
    const result = await this.prisma.file.findUnique({ where: { id } });
    if (!result) return;
    return this.map.toData(result);
  }

  async readFile(id: string): Promise<Readable | undefined> {
    const file = await this.getFile(id);
    if (!file) return;
    return await this.s3Repository.readFile(file.path);
  }

  async loadFile(id: string): Promise<Document[] | undefined> {
    const file = await this.getFile(id);
    if (!file) return;
    return await this.s3Repository.loadFile(file.path);
  }

  async deleteFile(id: string): Promise<void> {
    try {
      const file = await this.getFile(id);
      if (!file) return;
      await this.s3Repository.removeFile(file.path);
    } catch (e) {
      console.log('S3: Issue with deleting file ', e);
    }
    await this.prisma.file.delete({
      where: {
        id: id,
      },
    });
  }
}
