import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaQuestionMapper } from '@/infra/database/prisma/mappers/prisma-question-mapper';

export function factoryQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityID,) { // deixa as propriedades opcionais caso queiramos sobreescrever
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: faker.lorem.sentence(),
    content: faker.lorem.text(),
    ...override,
  }, id)

  return question;
}

@Injectable()
export class QuestionFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaQuestion(data: Partial<QuestionProps> = {},): Promise<Question> {
    const question = factoryQuestion(data);

    await this.prisma.question.create({
      data: PrismaQuestionMapper.convertToQuestionPrisma(question),
    })

    return question;
  }
}