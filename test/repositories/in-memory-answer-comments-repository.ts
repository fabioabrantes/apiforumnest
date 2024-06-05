import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/i-answer-comments-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { PaginationParams } from '@/domain/forum/application/dto/page-repository';

export class InMemoryAnswerCommentsRepository implements IAnswerCommentsRepository {
  public answerComments: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.answerComments.push(answerComment);
  }

  async findById(id: string) {
    const answerComment = this.answerComments.find((item) => item.id.toString() === id);

    if (!answerComment) {
      return null;
    }

    return answerComment;
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.answerComments.findIndex((item) => item.id === answerComment.id,);

    this.answerComments.splice(itemIndex, 1);
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.answerComments
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);

    return answerComments;
  }
}