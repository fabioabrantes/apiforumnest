import { IQuestionsRepository } from '@/domain/forum/application/repositories/i-questions-repository'
import { PaginationParams } from '@/domain/forum/application/dto/page-repository';
import { Question } from '@/domain/forum/enterprise/entities/question'
import { DomainEvents } from '@/coreShared/events/domain-events';
import { InMemoryAttachmentsRepository } from './in-memory-attachments-repository';
import { InMemoryStudentsRepository } from './in-memory-students-repository';
import { InMemoryQuestionAttachmentsRepository } from './in-memory-question-attachments-repository';
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details';

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public questions: Question[] = [];

  constructor(
    private questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
    private studentsRepository: InMemoryStudentsRepository,
  ) { }

  async create(question: Question) {
    this.questions.push(question);

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getItems(),
    );

    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async findBySlug(slug: string) {
    const question = this.questions.find((item) => item.slug.value === slug);

    if (!question) {
      return null
    }

    return question;
  }

  async findDetailsBySlug(slug: string) {
    const question = this.questions.find((item) => item.slug.value === slug);

    if (!question) {
      return null;
    }

    const author = this.studentsRepository.items.find((student) => student.id.equals(question.authorId));

    if (!author) {
      throw new Error(`Author with ID "${question.authorId.toString()}" does not exist.`,);
    }

    const questionAttachments = this.questionAttachmentsRepository.questionAttachments.filter(
      (questionAttachment) => questionAttachment.questionId.equals(question.id));

    const attachments = questionAttachments.map((questionAttachment) => {
      const attachment = this.attachmentsRepository.items.find((attachment) => {
        return attachment.id.equals(questionAttachment.attachmentId)
      })

      if (!attachment) {
        throw new Error(
          `Attachment with ID "${questionAttachment.attachmentId.toString()}" does not exist.`,
        )
      }

      return attachment;
    })

    const questionDetail = QuestionDetails.create({
      questionId: question.id,
      authorId: question.authorId,
      author: author.name,
      title: question.title,
      slug: question.slug,
      content: question.content,
      bestAnswerId: question.bestAnswerId,
      attachments,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    });

    return questionDetail;
  }

  async findById(id: string) {
    const question = this.questions.find((item) => item.id.toString() === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async delete(question: Question) {
    const itemIndex = this.questions.findIndex((item) => item.id === question.id);

    this.questions.splice(itemIndex, 1);

    this.questionAttachmentsRepository.deleteManyByQuestionId(question.id.toString(),);
  }

  async update(question: Question) {
    const itemIndex = this.questions.findIndex((item) => item.id === question.id);
    this.questions[itemIndex] = question;

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getNewItems(),
    );

    await this.questionAttachmentsRepository.deleteMany(
      question.attachments.getRemovedItems(),
    );

    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }
}