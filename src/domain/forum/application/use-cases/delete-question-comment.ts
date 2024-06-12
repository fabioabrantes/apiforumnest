import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/i-question-comments-repository';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { Either, error, success } from '@/coreShared/either';
import { ResourceNotFoundError } from '@/coreShared/errors/resource-not-found-error';
import { NotAllowedError } from '@/coreShared/errors/not-allowed-error';
import { Injectable } from '@nestjs/common';

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { questionComment: QuestionComment }>;
@Injectable()
export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: IQuestionCommentsRepository) { }

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(
      questionCommentId,
    )

    if (!questionComment) {
      return error(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toString() !== authorId) {
      return error(new NotAllowedError());
    }

    await this.questionCommentsRepository.delete(questionComment);

    return success({ questionComment });
  }
}