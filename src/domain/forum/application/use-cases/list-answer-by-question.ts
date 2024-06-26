import { Either, success } from '@/coreShared/either';
import { IAnswersRepository } from '@/domain/forum/application/repositories/i-answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { Injectable } from '@nestjs/common';

interface ListAnswerByQuestionUseCaseRequest {
  questionId: string;
  page: number;
}


type ListAnswerByQuestionUseCaseResponse = Either<null, { answers: Answer[] }>;
@Injectable()
export class ListAnswerByQuestionUseCase {
  constructor(private answersRepository: IAnswersRepository) { }

  async execute({
    questionId,
    page,
  }: ListAnswerByQuestionUseCaseRequest): Promise<ListAnswerByQuestionUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page },);

    return success({ answers, });
  }
}