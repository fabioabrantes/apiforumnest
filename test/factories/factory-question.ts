import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export function factoryQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityID,) { // deixa as propriedades opcionais caso queiramos sobreescrever
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: faker.lorem.sentence(),
    content: faker.lorem.text(),
    ...override,
  }, id)

  return question
}