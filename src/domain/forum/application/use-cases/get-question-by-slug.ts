import { Injectable } from '@nestjs/common';

import { Question } from '@/domain/forum/enterprise/entities/question';
import { IQuestionsRepository } from '@/domain/forum/application/repositories/i-questions-repository';
import { Either, error, success } from '@/coreShared/either';
import { ResourceNotFoundError } from '@/coreShared/errors/resource-not-found-error';
import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details';

interface GetQuestionBySlugUseCaseRequest {
  slug: string;
}


type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, { question: QuestionDetails }>;

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: IQuestionsRepository) { }

  async execute({ slug, }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findDetailsBySlug(slug);

    if (!question) {
      return error(new ResourceNotFoundError());
    }

    return success({ question, });
  }
}