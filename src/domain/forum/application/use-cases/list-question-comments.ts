import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/i-question-comments-repository';
import { Either, success } from '@/coreShared/either';

interface ListQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}


type ListQuestionCommentsUseCaseResponse = Either<null, { questionComments: QuestionComment[] }>;

export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: IQuestionCommentsRepository) { }

  async execute({
    questionId,
    page,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, { page, });

    return success({ questionComments, });
  }
}