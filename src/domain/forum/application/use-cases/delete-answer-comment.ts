import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/i-answer-comments-repository';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { Either, error, success } from '@/coreShared/either';
import { ResourceNotFoundError } from '@/coreShared/errors/resource-not-found-error';
import { NotAllowedError } from '@/coreShared/errors/not-allowed-error';

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answerComment: AnswerComment }>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) { }

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId,);

    if (!answerComment) {
      return error(new ResourceNotFoundError());
    }

    if (answerComment.authorId.toString() !== authorId) {
      return error(new NotAllowedError());
    }

    await this.answerCommentsRepository.delete(answerComment);

    return success({ answerComment });
  }
}