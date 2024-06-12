import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/i-answer-comments-repository';
import { Either, success } from '@/coreShared/either';
import { Injectable } from '@nestjs/common';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author';

interface ListAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

type ListAnswerCommentsUseCaseResponse = Either<null, { answerComments: CommentWithAuthor[] }>;
@Injectable()
export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) { }

  async execute({ answerId, page, }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerIdWithAuthor(answerId, { page, });

    return success({ answerComments, });
  }
}