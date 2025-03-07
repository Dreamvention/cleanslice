import { IFilesGateway, IFilterFile } from './files.gateway';
import { IUploadFileData, ICreateFileData } from './file.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  constructor(private readonly filesGateway: IFilesGateway) {}

  async getSignedUrl(teamId: string, key: string, contentType: string): Promise<{ url: string; path: string }> {
    return await this.filesGateway.getSignedUrl(teamId, key, contentType);
  }

  uploadFile(data: IUploadFileData) {
    if (data.dataBuffer === undefined) {
      throw new Error('Data is required');
    }
    if (data.contentType === undefined) {
      throw new Error('Type is required');
    }
    if (!data.name) {
      data.name = 'unknown';
    }

    return this.filesGateway.uploadFile(data);
  }

  createFile(data: ICreateFileData) {
    if (data.contentType === undefined) {
      throw new Error('Type is required');
    }
    if (!data.name) {
      data.name = 'unknown';
    }

    return this.filesGateway.createFile(data);
  }

  async getFiles(filter: IFilterFile) {
    return await this.filesGateway.getFiles(filter);
  }

  async getFile(id: string) {
    return await this.filesGateway.getFile(id);
  }

  async deleteFile(id: string) {
    return await this.filesGateway.deleteFile(id);
  }
}
