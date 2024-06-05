import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { PaginationParams } from '../dto/page-repository';

export interface IAnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>;
  findById(id: string): Promise<AnswerComment | null>;
  delete(answerComment: AnswerComment): Promise<void>;
  findManyByAnswerId(answerId: string, params: PaginationParams,): Promise<AnswerComment[]>
}