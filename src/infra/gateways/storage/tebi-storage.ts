import { UploadParams, Uploader, } from '@/domain/forum/application/gateways/storage/uploader';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { EnvService } from '@/infra/env/env.service';
import { randomUUID } from 'node:crypto';;

@Injectable()
export class TebiStorage implements Uploader {
  private client: S3Client;

  constructor(private envService: EnvService) {
    const credentials = {
      accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: envService.get('AWS_SECRET_ACCESS_KEY'),
    }

    this.client = new S3Client({
      endpoint: "https://s3.tebi.io",
      credentials,
      region: 'global',
    })
  }

  async upload({ fileName, fileType, body, }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    );

    return {
      url: uniqueFileName,
    }
  }
}