import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import { Either, success } from '@/coreShared/either';

import { Notification } from '@/domain/notification/enterprise/entities/notification';
import { INotificationsRepository } from '@/domain/notification/application/repositories/i-notifications-repository';

export interface SendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

export type SendNotificationUseCaseResponse = Either<null, { notification: Notification }>;
@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: INotificationsRepository) { }

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return success({ notification, });
  }
}