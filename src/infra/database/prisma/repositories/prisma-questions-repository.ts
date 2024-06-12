import { PaginationParams } from '@/domain/forum/application/dto/page-repository';
import { IQuestionsRepository } from '@/domain/forum/application/repositories/i-questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper';
import { IQuestionAttachmentsRepository } from '@/domain/forum/application/repositories/i-question-attachments-repository';
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details';
import { PrismaQuestionDetailsMapper } from '../mappers/prisma-question-details-mapper';
import { DomainEvents } from '@/coreShared/events/domain-events';
import { ICacheRepository } from '@/infra/database/cache/i-cache-repository';

@Injectable()
export class PrismaQuestionsRepository implements IQuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private cache: ICacheRepository,
    private questionAttachmentsRepository: IQuestionAttachmentsRepository,
  ) { }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      return null;
    }
    return PrismaQuestionMapper.convertToQuestionDomain(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })

    if (!question) {
      return null;
    }

    return PrismaQuestionMapper.convertToQuestionDomain(question)
  }

  async findDetailsBySlug(slug: string): Promise<QuestionDetails | null> {
    const cacheHit = await this.cache.get(`question:${slug}:details`);

    if (cacheHit) {
      const cacheData = JSON.parse(cacheHit);

      return cacheData;
    }

    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
        attachments: true,
      },
    });

    if (!question) {
      return null;
    }

    const questionDetails = PrismaQuestionDetailsMapper.convertToQuestionDetailsDomain(question);

    await this.cache.set(`question:${slug}:details`, JSON.stringify(questionDetails),);

    return questionDetails;
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return questions.map(PrismaQuestionMapper.convertToQuestionDomain);
  }

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.convertToQuestionPrisma(question);

    await this.prisma.question.create({
      data,
    });

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getItems(),
    );

    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async update(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.convertToQuestionPrisma(question);

    await Promise.all([
      this.prisma.question.update({
        where: {
          id: question.id.toString(),
        },
        data,
      }),

      this.questionAttachmentsRepository.createMany(
        question.attachments.getNewItems(),
      ),

      this.questionAttachmentsRepository.deleteMany(
        question.attachments.getRemovedItems(),
      ),
      this.cache.delete(`question:${data.slug}:details`),
    ]);

    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.convertToQuestionPrisma(question);

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    })
  }
}