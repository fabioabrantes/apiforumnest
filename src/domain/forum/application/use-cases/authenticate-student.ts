import { Either, error, success } from '@/coreShared/either';
import { Injectable } from '@nestjs/common'
import { IStudentsRepository } from '../repositories/i-students-repository'
import { HashComparer } from '../gateways/cryptography/hash-comparer';
import { EncryptPayload } from '../gateways/cryptography/encrypter-payload';
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateStudentUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateStudentUseCaseResponse = Either<WrongCredentialsError, { accessToken: string }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(private studentsRepository: IStudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: EncryptPayload,
  ) { }

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email);

    if (!student) {
      return error(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(password, student.password,);

    if (!isPasswordValid) {
      return error(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({ sub: student.id.toString(), });

    return success({ accessToken, });
  }
}