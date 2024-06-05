import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import { DomainEvent } from '@/coreShared/events/domain-event';
import { Answer } from '../entities/answer';

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  public answer: Answer;

  constructor(answer: Answer) {
    this.answer = answer;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.answer.id;
  }
}