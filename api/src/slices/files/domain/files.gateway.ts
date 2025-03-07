import { Injectable } from '@nestjs/common';
import { IUploadFileData, IFileData, ICreateFileData } from './file.types';
import { Readable } from 'stream';
import { DocumentInterface } from '@langchain/core/dist/documents';

@Injectable()
export abstract class IFilesGateway {
  abstract uploadFile(data: IUploadFileData): Promise<IFileData>;
  abstract createFile(data: ICreateFileData): Promise<IFileData>;
  abstract getFiles(filter: IFilterFile): Promise<IFileData[]>;
  abstract getSignedUrl(teamId: string, key: string, contentType: string): Promise<{ url: string; path: string }>;
  abstract getFile(id: string): Promise<IFileData>;
  abstract deleteFile(id: string): Promise<void>;
  abstract readFile(id: string): Promise<Readable>;
  abstract loadFile(id: string): Promise<DocumentInterface[]>;
}

export interface IFilterFile {
  teamId: string;
  type?: string;
  contentType?: string;
}
