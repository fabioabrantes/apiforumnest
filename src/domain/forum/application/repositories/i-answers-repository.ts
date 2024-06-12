import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { PaginationParams } from "../dto/page-repository";
import { CommentWithAuthor } from "../../enterprise/entities/value-objects/comment-with-author";


export abstract class IAnswersRepository {
  abstract create(answer: Answer): Promise<void>;
  abstract findById(id: string): Promise<Answer | null>;
  abstract delete(answer: Answer): Promise<void>;
  abstract update(answer: Answer): Promise<void>;
  abstract findManyByQuestionId(questionId: string, params: PaginationParams,): Promise<Answer[]>
}