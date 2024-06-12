import { Prisma,Attachment as PrismaAttachment } from '@prisma/client';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';
import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';

export class PrismaAttachmentMapper {
  static convertToAttachmentDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        title: raw.title,
        url: raw.url,
      },
      new UniqueEntityID(raw.id),
    );
  }
  static convertToAttachmentPrisma(attachment: Attachment,): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}