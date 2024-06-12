import { Either, error, success } from '@/coreShared/either';
import { IAnswersRepository } from '@/domain/forum/application/repositories/i-answers-repository';
import { ResourceNotFoundError } from '@/coreShared/errors/resource-not-found-error';
import { NotAllowedError } from '@/coreShared/errors/not-allowed-error';
import { Answer } from '../../enterprise/entities/answer';
import { Injectable } from '@nestjs/common';

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answer: Answer }>;
@Injectable()
export class DeleteAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) { }

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return error(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return error(new NotAllowedError());
    }

    await this.answersRepository.delete(answer);

    return success({ answer });
  }
}