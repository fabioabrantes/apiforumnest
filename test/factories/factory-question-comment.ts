import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';

import { QuestionComment, QuestionCommentProps } from '@/domain/forum/enterprise/entities/question-comment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaQuestionCommentMapper } from '@/infra/database/prisma/mappers/prisma-question-comment-mapper';

export function factoryQuestionComment(override: Partial<QuestionCommentProps> = {}, id?: UniqueEntityID,) {
  const question = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return question;
}

@Injectable()
export class QuestionCommentFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaQuestionComment(
    data: Partial<QuestionCommentProps> = {},
  ): Promise<QuestionComment> {
    const questionComment = factoryQuestionComment(data)

    await this.prisma.comment.create({
      data: PrismaQuestionCommentMapper.convertToCommentPrisma(questionComment),
    })

    return questionComment
  }
}