import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IAttachmentsRepository } from '@/domain/forum/application/repositories/i-attachments-repository';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper';

@Injectable()
export class PrismaAttachmentsRepository implements IAttachmentsRepository {
  constructor(private prisma: PrismaService) { }

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.convertToAttachmentPrisma(attachment);

    await this.prisma.attachment.create({
      data,
    });
  }
}