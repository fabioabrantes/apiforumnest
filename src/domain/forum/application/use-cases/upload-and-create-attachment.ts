import { Either, error, success } from '@/coreShared/either';
import { Injectable } from '@nestjs/common';
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type-error';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';
import { IAttachmentsRepository } from '@/domain/forum/application/repositories/i-attachments-repository';
import { Uploader } from '@/domain/forum/application/gateways/storage/uploader';

interface UploadAndCreateAttachmentRequest {
  fileName: string;
  fileType: string;
  body: Buffer;
}

type UploadAndCreateAttachmentResponse = Either<InvalidAttachmentTypeError, { attachment: Attachment }>;

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(private attachmentsRepository: IAttachmentsRepository, private uploader: Uploader,) { }

  
  async execute({ fileName, fileType, body, }: UploadAndCreateAttachmentRequest): Promise<UploadAndCreateAttachmentResponse> {
    const validateTypeAttachment = /^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType); // veririfa o tipo de arquivo e retorna true ou false;

    if (!validateTypeAttachment) {
      return error(new InvalidAttachmentTypeError(fileType));
    }

    const { url } = await this.uploader.upload({ fileName, fileType, body });

    const attachment = Attachment.create({ title: fileName, url, });

    await this.attachmentsRepository.create(attachment);

    return success({ attachment, });
  }
}