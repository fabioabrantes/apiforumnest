import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { ListQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/list-question-comments';
import { factoryQuestionComment } from 'test/factories/factory-question-comment';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { factoryStudent } from 'test/factories/factory-student';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryStudentsRepository: InMemoryStudentsRepository;
let sut: ListQuestionCommentsUseCase;

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(inMemoryStudentsRepository);

    sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able to list question comments', async () => {
    const student = factoryStudent({ name: 'John Doe' });

    inMemoryStudentsRepository.items.push(student);

    const comment1 = factoryQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    })
    const comment2 = factoryQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    });
    const comment3 = factoryQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    });

    await inMemoryQuestionCommentsRepository.create(comment1);
    await inMemoryQuestionCommentsRepository.create(comment2);
    await inMemoryQuestionCommentsRepository.create(comment3);

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(result.value?.comments).toHaveLength(3);
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'John Doe',
          commentId: comment1.id,
        }),
        expect.objectContaining({
          author: 'John Doe',
          commentId: comment2.id,
        }),
        expect.objectContaining({
          author: 'John Doe',
          commentId: comment3.id,
        }),
      ]),
    );
  });

  it('should be able to fetch paginated question comments', async () => {
    const student = factoryStudent({ name: 'John Doe' });

    inMemoryStudentsRepository.items.push(student);

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        factoryQuestionComment({
          questionId: new UniqueEntityID('question-1'),
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2);
  })
})