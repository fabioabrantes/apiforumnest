import { Either, error, success } from '@/coreShared/either';
import { IQuestionsRepository } from '@/domain/forum/application/repositories/i-questions-repository';
import { ResourceNotFoundError } from '@/coreShared/errors/resource-not-found-error';
import { NotAllowedError } from '@/coreShared/errors/not-allowed-error';
import { Question } from '../../enterprise/entities/question';
import { Injectable } from '@nestjs/common';

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>;
@Injectable()
export class DeleteQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) { }

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return error(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return error(new NotAllowedError());
    }

    await this.questionsRepository.delete(question);

    return success({ question });
  }
}