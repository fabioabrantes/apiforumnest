import { PaginationParams } from '@/domain/forum/application/dto/page-repository';
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/i-question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { InMemoryStudentsRepository } from './in-memory-students-repository';
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';

export class InMemoryQuestionCommentsRepository implements IQuestionCommentsRepository {
  public questionComments: QuestionComment[] = [];

  constructor(private studentsRepository: InMemoryStudentsRepository) {}
  
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

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ) {
    const questionComments = this.questionComments.filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentsRepository.items.find((student) => student.id.equals(comment.authorId));
        if (!author) {
          throw new Error(
            `Author with ID "${comment.authorId.toString()} does not exist."`,
          )
        }

        return CommentWithAuthor.create({
          commentId: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          authorId: comment.authorId,
          author: author.name,
        });
      });

    return questionComments;
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