import { IAnswersRepository } from '@/domain/forum/application/repositories/i-answers-repository';
import { Question } from '@/domain/forum/enterprise/entities/question'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/i-questions-repository'
import { Either, error, success } from '@/coreShared/either';
import { ResourceNotFoundError } from '@/coreShared/errors/resource-not-found-error';
import { NotAllowedError } from '@/coreShared/errors/not-allowed-error';


interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>;

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private answersRepository: IAnswersRepository,
  ) { }

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return error(new ResourceNotFoundError());
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      return error(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return error(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.update(question);

    return success({ question, });
  }
}