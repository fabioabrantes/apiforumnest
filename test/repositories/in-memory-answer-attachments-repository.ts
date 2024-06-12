import { IAnswerAttachmentsRepository } from '@/domain/forum/application/repositories/i-answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository implements IAnswerAttachmentsRepository {
  public answerAttachments: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.answerAttachments.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.answerAttachments.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.answerAttachments = answerAttachments;
  }

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    this.answerAttachments.push(...attachments);
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    const answerAttachments = this.answerAttachments.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    });

    this.answerAttachments = answerAttachments;
  }
}