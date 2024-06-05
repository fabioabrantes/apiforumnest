import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { PaginationParams } from "../dto/page-repository";


export interface IAnswersRepository {
  create(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  delete(answer: Answer): Promise<void>;
  update(answer: Answer): Promise<void>;
  findManyByQuestionId(questionId: string, params: PaginationParams,): Promise<Answer[]>
}