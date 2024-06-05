import { Question } from '@/domain/forum/enterprise/entities/question'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/i-questions-repository';
import { Either, success } from '@/coreShared/either';
import { Injectable } from '@nestjs/common';

interface ListRecentQuestionsUseCaseRequest {
  page: number;
}

type ListRecentQuestionsUseCaseResponse = Either<null, { questions: Question[] }>;

@Injectable()
export class ListRecentQuestionsUseCase {
  constructor(private questionsRepository: IQuestionsRepository) { }

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page });

    return success({ questions, });
  }
}