import { Either, error, success } from '@/coreShared/either';
import { Injectable } from '@nestjs/common';
import { Student } from '@/domain/forum/enterprise/entities/student';
import { IStudentsRepository } from '../repositories/i-students-repository';
import { HashGenerator } from '../gateways/cryptography/hash-generator';
import { StudentAlreadyExistsError } from './errors/student-already-exists-error';

interface RegisterStudentUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterStudentUseCaseResponse = Either<StudentAlreadyExistsError, { student: Student }>;

@Injectable()
export class RegisterStudentUseCase {
  constructor( private studentsRepository: IStudentsRepository,private hashGenerator: HashGenerator,
  ) { }

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email);

    if (studentWithSameEmail) {
      return error(new StudentAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.studentsRepository.create(student);

    return success({
      student,
    });
  }
}