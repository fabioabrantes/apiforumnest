import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { ListAnswerByQuestionUseCase } from '@/domain/forum/application/use-cases/list-answer-by-question';
import { factoryAnswer } from 'test/factories/factory-answer';
import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ListAnswerByQuestionUseCase;

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
    sut = new ListAnswerByQuestionUseCase(inMemoryAnswersRepository);
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      factoryAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryAnswersRepository.create(
      factoryAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    );
    await inMemoryAnswersRepository.create(
      factoryAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    );

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(result.value?.answers).toHaveLength(3);
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        factoryAnswer({
          questionId: new UniqueEntityID('question-1'),
        }),
      );
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2);
  })
})