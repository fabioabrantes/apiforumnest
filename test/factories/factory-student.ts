import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import {
  Student,
  StudentProps,
} from '@/domain/forum/enterprise/entities/student'

export function factoryStudent(override: Partial<StudentProps> = {}, id?: UniqueEntityID,) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student;
}