import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { PaginationParams } from '@/domain/forum/application/dto/page-repository';

export interface IQuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>;
  findById(id: string): Promise<QuestionComment | null>;
  delete(questionComment: QuestionComment): Promise<void>;
  findManyByQuestionId(questionId: string, params: PaginationParams,): Promise<QuestionComment[]>
}