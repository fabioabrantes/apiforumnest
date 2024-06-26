import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { FakeHasher } from 'test/stubs/cryptography/fake-hasher';
import { FakeEncrypter } from 'test/stubs/cryptography/fake-encrypter';
import { AuthenticateStudentUseCase } from './authenticate-student'
import { factoryStudent } from 'test/factories/factory-student';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let encrypter: FakeEncrypter;

let sut: AuthenticateStudentUseCase;

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    sut = new AuthenticateStudentUseCase(inMemoryStudentsRepository, fakeHasher, encrypter,);
  })

  it('should be able to authenticate a student', async () => {
    const student = factoryStudent({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryStudentsRepository.items.push(student);

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual({ accessToken: expect.any(String), });
  });
});