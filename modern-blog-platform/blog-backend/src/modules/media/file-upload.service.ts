import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import { Upload } from './dto/upload-file.input';
import { MediaService } from './media.service';

@Injectable()
export class FileUploadService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    private configService: ConfigService,
    private mediaService: MediaService,
  ) {
    this.bucketName = this.configService.get('aws.bucketName') || '';

    this.s3Client = new S3Client({
      region: this.configService.get('aws.region') || 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get('aws.accessKeyId') || '',
        secretAccessKey: this.configService.get('aws.secretAccessKey') || '',
      },
    });
  }

  async uploadFile(file: Upload, userId: string) {
    const { createReadStream, filename, mimetype } = file;
    const fileStream: Readable = createReadStream();
    const ext = extname(filename);
    const key = `${uuidv4()}${ext}`;
    const size = await this.getFileSize(fileStream);

    try {
      // Convert Stream to Buffer to make it compatible with S3 SDK
      const buffer = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        fileStream.on('data', (chunk: Buffer | string) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });
        fileStream.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        fileStream.on('error', (error: Error) => {
          reject(error);
        });
      });

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: buffer,
          ContentType: mimetype,
          ACL: 'public-read',
        }),
      );

      // Generate the URL for the uploaded file
      const url = `https://${this.bucketName}.s3.amazonaws.com/${key}`;

      // Create media record in the database
      return this.mediaService.create(userId, {
        filename,
        url,
        key,
        type: mimetype,
        size,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Error uploading file: ${errorMessage}`);
    }
  }

  async deleteFile(key: string) {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Error deleting file: ${errorMessage}`);
    }
  }

  async generatePresignedUrl(key: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Error generating presigned URL: ${errorMessage}`);
    }
  }

  private async getFileSize(stream: Readable): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      let size = 0;
      stream
        .on('data', (chunk: Buffer) => {
          size += chunk.length;
        })
        .on('end', () => {
          resolve(size);
        })
        .on('error', (err: Error) => {
          reject(new Error(`Failed to get file size: ${err.message}`));
        });
    });
  }
}
