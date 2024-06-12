import { Question } from '@/domain/forum/enterprise/entities/question';
import { PaginationParams } from '../dto/page-repository';
import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details';


export abstract class IQuestionsRepository {
  abstract create(question: Question): Promise<void>;
  abstract findBySlug(slug: string): Promise<Question | null>;
  abstract findDetailsBySlug(slug: string): Promise<QuestionDetails | null>;
  abstract findById(id: string): Promise<Question | null>;
  abstract delete(question: Question): Promise<void>;
  abstract update(question: Question): Promise<void>;
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
}