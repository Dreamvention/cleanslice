import { IFileData, ICreateFileData, IUpdateFileData, IUploadFileData } from '../domain';
import DB, { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ulid } from 'ulid';

export type IFileResponse = DB.File;

export type IFileCreateRequest = Prisma.XOR<Prisma.FileCreateInput, Prisma.FileUncheckedCreateInput>;
export type IFileUpdateRequest = Prisma.XOR<Prisma.FileUpdateInput, Prisma.FileUncheckedUpdateInput>;

@Injectable()
export class FileMapper {
  toData(data: IFileResponse): IFileData {
    return {
      id: data.id,
      teamId: data.teamId,
      name: data.name,
      contentType: data.contentType,
      path: data.path,
      url: `${process.env.S3_STATIC_URL ?? `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}`}/${data.path}`,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  toPath(teamId: string, name: string) {
    console.log(`${teamId}/${ulid()}-${name.replace(/\s/, '_')}`);
    return `${teamId}/${ulid()}-${name.replace(/\s/, '_')}`;
  }

  toCreate(data: ICreateFileData | IUploadFileData): IFileCreateRequest {
    const id = `file-${uuid()}`;
    if (!data.path) {
      data.path = this.toPath(data.teamId, data.name);
    }

    return {
      id,
      team: { connect: { id: data.teamId } },
      contentType: data.contentType,
      name: data.name,
      path: data.path,
    };
  }

  toUpdate(data: IUpdateFileData): IFileUpdateRequest {
    return {
      name: data.name,
    };
  }
}
