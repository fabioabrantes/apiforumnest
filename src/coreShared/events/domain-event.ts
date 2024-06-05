import { UniqueEntityID } from '../entities/unique-entity-id';

//published
export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityID;
}