export interface IUploadFileData {
  teamId: string;
  dataBuffer: Buffer;
  contentType: string;
  name: string;
  path?: string;
}

export interface IFileData {
  id: string;
  teamId: string;
  name: string;
  contentType: string;
  path: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateFileData {
  teamId: string;
  contentType: string;
  name: string;
  path: string;
}

export interface IUpdateFileData {
  name: string;
}
