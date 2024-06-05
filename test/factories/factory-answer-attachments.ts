import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';

import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

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