import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';

import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function factoryAnswerAttachment(override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const answerAttachment = AnswerAttachment.create({
    answerId: new UniqueEntityID(),
    attachmentId: new UniqueEntityID(),
    ...override,
  },
    id,
  );

  return answerAttachment;
}

@Injectable()
export class AnswerAttachmentFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaAnswerAttachment(data: Partial<AnswerAttachmentProps> = {},): Promise<AnswerAttachment> {
    const answerAttachment = factoryAnswerAttachment(data);

    await this.prisma.attachment.update({
      where: {
        id: answerAttachment.attachmentId.toString(),
      },
      data: {
        answerId: answerAttachment.answerId.toString(),
      },
    });

    return answerAttachment;
  }
}