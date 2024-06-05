import { OnAnswerCreatedSubscriber } from '@/domain/notification/application/subscribers/on-answer-created-subscriber';
import { factoryAnswer } from 'test/factories/factory-answer';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { factoryQuestion } from 'test/factories/factory-question';
import { SpyInstance, MockInstance } from 'vitest';
import { waitFor } from 'test/utils/wait-for';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: MockInstance<[SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>;
// Adicionei aqui
const sendNotificationUseCaseCallback = vi.fn();

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository,);
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository,);

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository,);

    sendNotificationExecuteSpy = sendNotificationUseCaseCallback(sendNotificationUseCase, 'execute');

    new OnAnswerCreatedSubscriber(inMemoryQuestionsRepository, sendNotificationUseCase);
  })

  it('should  send a notification when an answer is created', async () => {
    const question = factoryQuestion();
    const answer = factoryAnswer({ questionId: question.id });

    inMemoryQuestionsRepository.create(question);
    inMemoryAnswersRepository.create(answer);

    await waitFor(() => {
      expect(sendNotificationUseCaseCallback).toHaveBeenCalled();
    });
  })
})