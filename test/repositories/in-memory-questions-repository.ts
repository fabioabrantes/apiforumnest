import { IQuestionsRepository } from '@/domain/forum/application/repositories/i-questions-repository'
import { PaginationParams } from '@/domain/forum/application/dto/page-repository';
import { Question } from '@/domain/forum/enterprise/entities/question'
import { IQuestionAttachmentsRepository } from '@/domain/forum/application/repositories/i-question-attachments-repository';
import { DomainEvents } from '@/coreShared/events/domain-events';

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public questions: Question[] = [];

  constructor(
    private questionAttachmentsRepository: IQuestionAttachmentsRepository,
  ) { }

  async create(question: Question) {
    this.questions.push(question);
    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async findBySlug(slug: string) {
    const question = this.questions.find((item) => item.slug.value === slug);

    if (!question) {
      return null
    }

    return question;
  }

  async findById(id: string) {
    const question = this.questions.find((item) => item.id.toString() === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async delete(question: Question) {
    const itemIndex = this.questions.findIndex((item) => item.id === question.id);

    this.questions.splice(itemIndex, 1);

    this.questionAttachmentsRepository.deleteManyByQuestionId(question.id.toString(),);
  }

  async update(question: Question) {
    const itemIndex = this.questions.findIndex((item) => item.id === question.id);
    this.questions[itemIndex] = question;

    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }
}