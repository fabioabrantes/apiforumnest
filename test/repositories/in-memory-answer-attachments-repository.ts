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
}