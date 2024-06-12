import { Injectable } from '@nestjs/common';

import { Question } from '@/domain/forum/enterprise/entities/question'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/i-questions-repository';
import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import { Either, success } from '@/coreShared/either';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list';

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>;

@Injectable()
export class CreateQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) { }

  async execute({ authorId, title, content, attachmentsIds }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({ authorId: new UniqueEntityID(authorId), title, content, });

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      });
    });

    question.attachments = new QuestionAttachmentList(questionAttachments);

    await this.questionsRepository.create(question);

    return success({ question, });
  }
}