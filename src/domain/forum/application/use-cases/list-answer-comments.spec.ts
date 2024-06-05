import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { ListAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/list-answer-comments';
import { factoryAnswerComment } from 'test/factories/factory-answer-comment';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: ListAnswerCommentsUseCase;

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new ListAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      factoryAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    );

    await inMemoryAnswerCommentsRepository.create(
      factoryAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    );

    await inMemoryAnswerCommentsRepository.create(
      factoryAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    );

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    });

    expect(result.value?.answerComments).toHaveLength(3);
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        factoryAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
        }),
      );
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    });

    expect(result.value?.answerComments).toHaveLength(2);
  })
})