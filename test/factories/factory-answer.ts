import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import {
  Answer,
  AnswerProps,
} from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaAnswerMapper } from '@/infra/database/prisma/mappers/prisma-answer-mapper';

export function factoryAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityID,) { // deixa as propriedades opcionais caso queiramos sobreescrever
  const answer = Answer.create({
    authorId: new UniqueEntityID(),
    questionId: new UniqueEntityID(),
    content: faker.lorem.text(),
    ...override,
  }, id)

  return answer;
}
@Injectable()
export class AnswerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswer(data: Partial<AnswerProps> = {}): Promise<Answer> {
    const answer = factoryAnswer(data)

    await this.prisma.answer.create({
      data: PrismaAnswerMapper.convertToAnswerPrisma(answer),
    })

    return answer
  }
}