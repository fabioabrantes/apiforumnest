import { User as PrismaUser, Prisma } from '@prisma/client';
import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import { Student } from '@/domain/forum/enterprise/entities/student'

export class PrismaStudentMapper {
  static convertToStudioDomain(raw: PrismaUser): Student {
    return Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static convertToStudioPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    }
  }
}