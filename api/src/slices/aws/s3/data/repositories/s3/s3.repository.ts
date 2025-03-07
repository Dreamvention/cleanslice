import { Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
  ListObjectsCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';
import { S3Loader } from './langchain/s3';
import { Document } from 'langchain/document';

@Injectable()
export class S3Repository {
  client: S3Client;
  bucketName: string;
  constructor() {
    this.bucketName = process.env.S3_BUCKET_NAME;
    const clientConfig: S3ClientConfig = {
      region: process.env.AWS_REGION,
      forcePathStyle: true,
    };

    if (process.env.S3_ENDPOINT) {
      clientConfig.endpoint = process.env.S3_ENDPOINT;
    }

    this.client = new S3Client(clientConfig);
  }

  async uploadFile(key: string, contentType: string, body: Buffer) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
  }

  async uploadFileMultipart(key: string, contentType: string, body: Buffer) {
    let uploadId;
    try {
      const multipartUpload = await this.client.send(
        new CreateMultipartUploadCommand({
          Bucket: this.bucketName,
          Key: key,
          ContentType: contentType,
        }),
      );

      const uploadId = multipartUpload.UploadId;
      const uploadPromises = [];
      const partSize = 5 * 1024 * 1024;
      const partsCount = Math.ceil(body.length / partSize);

      for (let i = 0; i < partsCount; i++) {
        const start = i * partSize;
        const end = start + partSize;
        uploadPromises.push(
          this.client
            .send(
              new UploadPartCommand({
                Bucket: this.bucketName,
                Key: key,
                UploadId: uploadId,
                Body: body.subarray(start, end),
                PartNumber: i + 1,
              }),
            )
            .then((d) => {
              console.log('Part', i + 1, 'uploaded');
              return d;
            }),
        );
      }
      const uploadResults = await Promise.all(uploadPromises);

      return await this.client.send(
        new CompleteMultipartUploadCommand({
          Bucket: this.bucketName,
          Key: key,
          UploadId: uploadId,
          MultipartUpload: {
            Parts: uploadResults.map(({ ETag }, i) => ({
              ETag,
              PartNumber: i + 1,
            })),
          },
        }),
      );
    } catch (err) {
      console.error(err);

      if (uploadId) {
        const abortCommand = new AbortMultipartUploadCommand({
          Bucket: this.bucketName,
          Key: key,
          UploadId: uploadId,
        });

        await this.client.send(abortCommand);
      }
    }
  }

  async removeFile(key: string) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      }),
    );
  }

  async getSignedUrl(key: string, contentType: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });
    return await getSignedUrl(this.client, command, {
      expiresIn: 3600,
    });
  }

  async renameFile(oldKey: string, newKey: string) {
    if (oldKey == newKey) return;
    await this.client.send(
      new CopyObjectCommand({
        Bucket: this.bucketName,
        CopySource: '/' + this.bucketName + '/' + oldKey,
        Key: newKey,
      }),
    );
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: oldKey,
      }),
    );
  }

  async moveFiles(from: string, to: string) {
    const response = await this.listFiles(from);
    for (const item of response.Contents) {
      await this.client.send(
        new CopyObjectCommand({
          Bucket: this.bucketName,
          CopySource: '/' + this.bucketName + '/' + item.Key,
          Key: item.Key.replace(from, to),
        }),
      );
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: item.Key,
        }),
      );
    }
  }

  async removeFolder(from: string) {
    const response = await this.listFiles(from);
    for (const item of response.Contents) {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: item.Key,
        }),
      );
    }
  }

  async listFiles(key: string) {
    const response = await this.client.send(
      new ListObjectsCommand({
        Bucket: this.bucketName,
        Delimiter: '/',
        Prefix: key,
      }),
    );
    return response;
  }

  async readFile(key: string) {
    const { Body } = await this.client.send(
      new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      }),
    );

    return Body as Readable;
  }

  //TODO: relocated to sources/sources/data/repositories/files
  // https://github.com/Unstructured-IO/unstructured-api
  async loadFile(key: string): Promise<Document[]> {
    const clientConfig: S3ClientConfig = {
      region: process.env.AWS_REGION,
      forcePathStyle: true,
    };

    if (process.env.S3_ENDPOINT) {
      clientConfig.endpoint = process.env.S3_ENDPOINT;
    }

    const s3LoaderConfig = {
      bucket: this.bucketName,
      key: key,
      s3Config: clientConfig,
      unstructuredAPIURL: process.env.UNSTRUCTURED_API_URL,
      unstructuredAPIKey: undefined,
    };

    if (process.env.UNSTRUCTURED_API_KEY) {
      s3LoaderConfig.unstructuredAPIKey = process.env.UNSTRUCTURED_API_KEY;
    }

    const loader = new S3Loader(s3LoaderConfig);

    return await loader.load();
  }
}
