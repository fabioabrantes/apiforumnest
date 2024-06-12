import { IQuestionAttachmentsRepository } from '@/domain/forum/application/repositories/i-question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements IQuestionAttachmentsRepository {
  public questionAttachments: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.questionAttachments.filter(
      (item) => item.questionId.toString() === questionId,
    );

    return questionAttachments;
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.questionAttachments.filter(
      (item) => item.questionId.toString() !== questionId,
    );

    this.questionAttachments = questionAttachments;
  }

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.questionAttachments.push(...attachments);
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const questionAttachmentsNew = this.questionAttachments.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    })

    this.questionAttachments = questionAttachmentsNew;
  }
}