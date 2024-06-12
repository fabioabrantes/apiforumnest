import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository';
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository';
import { IQuestionsRepository } from '@/domain/forum/application/repositories/i-questions-repository';
import { IStudentsRepository } from '@/domain/forum/application/repositories/i-students-repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository';
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/i-question-comments-repository';
import { IQuestionAttachmentsRepository } from '@/domain/forum/application/repositories/i-question-attachments-repository';
import { IAnswersRepository } from '@/domain/forum/application/repositories/i-answers-repository';
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/i-answer-comments-repository';
import { IAnswerAttachmentsRepository } from '@/domain/forum/application/repositories/i-answer-attachments-repository';
import { IAttachmentsRepository } from '@/domain/forum/application/repositories/i-attachments-repository';
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository';
import { INotificationsRepository } from '@/domain/notification/application/repositories/i-notifications-repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';
import { CacheModule } from './cache.module';

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: IQuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: IStudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: IQuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: IQuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: IAnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: IAnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: IAnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: IAttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: INotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    IQuestionsRepository,
    IStudentsRepository,
    IQuestionCommentsRepository,
    IQuestionAttachmentsRepository,
    IAnswersRepository,
    IAnswerCommentsRepository,
    IAnswerAttachmentsRepository,
    IAttachmentsRepository,
    INotificationsRepository
  ],
})
export class DatabaseModule { }