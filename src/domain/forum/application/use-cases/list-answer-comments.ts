import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/i-answer-comments-repository';
import { Either, success } from '@/coreShared/either';

interface ListAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

type ListAnswerCommentsUseCaseResponse = Either<null, { answerComments: AnswerComment[] }>;

export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) { }

  async execute({
    answerId,
    page,
  }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, { page, });

    return success({ answerComments, });
  }
}