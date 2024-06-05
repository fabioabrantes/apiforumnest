import { PaginationParams } from '@/domain/forum/application/dto/page-repository';
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/i-question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository implements IQuestionCommentsRepository {
  public questionComments: QuestionComment[] = [];

  async create(questionComment: QuestionComment) {
    this.questionComments.push(questionComment);
  }

  async findById(id: string) {
    const questionComment = this.questionComments.find((item) => item.id.toString() === id);

    if (!questionComment) {
      return null;
    }

    return questionComment;
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.questionComments.findIndex((item) => item.id === questionComment.id,);

    this.questionComments.splice(itemIndex, 1);
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.questionComments
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return questionComments;
  }
}