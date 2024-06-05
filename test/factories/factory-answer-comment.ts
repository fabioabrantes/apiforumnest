import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';

import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment'

export function factoryAnswerComment(override: Partial<AnswerCommentProps> = {}, id?: UniqueEntityID,) {
  const answer = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer;
}