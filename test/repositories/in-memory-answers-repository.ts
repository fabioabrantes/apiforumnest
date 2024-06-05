import { IAnswersRepository } from '@/domain/forum/application/repositories/i-answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { PaginationParams } from '@/domain/forum/application/dto/page-repository';
import { IAnswerAttachmentsRepository } from '@/domain/forum/application/repositories/i-answer-attachments-repository';
import { DomainEvents } from '@/coreShared/events/domain-events';

export class InMemoryAnswersRepository implements IAnswersRepository {
  public answers: Answer[] = [];

  constructor(
    private answerAttachmentsRepository: IAnswerAttachmentsRepository,
  ) { }

  async create(answer: Answer) {
    this.answers.push(answer);

    // Como já salvei a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async findById(id: string) {
    const answer = this.answers.find((item) => item.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }

  async delete(answer: Answer) {
    const itemIndex = this.answers.findIndex((item) => item.id === answer.id);

    this.answers.splice(itemIndex, 1);
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
  }

  async update(answer: Answer) {
    const itemIndex = this.answers.findIndex((item) => item.id === answer.id);

    this.answers[itemIndex] = answer;

    // Como já salvei a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.answers
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }
}