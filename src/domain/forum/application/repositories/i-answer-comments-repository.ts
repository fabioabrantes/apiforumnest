import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { PaginationParams } from '../dto/page-repository';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author';

export abstract class IAnswerCommentsRepository {
  abstract create(answerComment: AnswerComment): Promise<void>;
  abstract findById(id: string): Promise<AnswerComment | null>;
  abstract findManyByAnswerIdWithAuthor(answerId: string, params: PaginationParams,): Promise<CommentWithAuthor[]>;
  abstract delete(answerComment: AnswerComment): Promise<void>;
  abstract findManyByAnswerId(answerId: string, params: PaginationParams,): Promise<AnswerComment[]>
}