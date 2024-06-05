import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import {
  Answer,
  AnswerProps,
} from '@/domain/forum/enterprise/entities/answer'

export function factoryAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityID,) { // deixa as propriedades opcionais caso queiramos sobreescrever
  const answer = Answer.create({
    authorId: new UniqueEntityID(),
    questionId: new UniqueEntityID(),
    content: faker.lorem.text(),
    ...override,
  }, id)

  return answer;
}