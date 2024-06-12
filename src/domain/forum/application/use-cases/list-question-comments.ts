import { Injectable } from '@nestjs/common';

import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/i-question-comments-repository';
import { Either, success } from '@/coreShared/either';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author';

interface ListQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

type ListQuestionCommentsUseCaseResponse = Either<null, { comments: CommentWithAuthor[] }>;
@Injectable()
export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: IQuestionCommentsRepository) { }

  async execute({
    questionId,
    page,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const comments = await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
      questionId,
      {
        page,
      },
    )

    return success({ comments, });
  }
}