import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { PaginationParams } from '@/domain/forum/application/dto/page-repository';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author';

export abstract class IQuestionCommentsRepository {
  abstract create(questionComment: QuestionComment): Promise<void>;
  abstract findById(id: string): Promise<QuestionComment | null>;
  abstract findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>;
  abstract delete(questionComment: QuestionComment): Promise<void>;
  abstract findManyByQuestionId(questionId: string, params: PaginationParams,): Promise<QuestionComment[]>
}