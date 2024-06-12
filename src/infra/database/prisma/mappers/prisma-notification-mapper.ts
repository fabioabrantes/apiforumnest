import { Notification as PrismaNotification, Prisma } from '@prisma/client';
import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';
import { Notification } from '@/domain/notification/enterprise/entities/notification';

export class PrismaNotificationMapper {
  static convertToNotificationDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        title: raw.title,
        content: raw.content,
        recipientId: new UniqueEntityID(raw.recipientId),
        readAt: raw.readAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static convertToNotificationPrisma(
    notification: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id.toString(),
      recipientId: notification.recipientId.toString(),
      title: notification.title,
      content: notification.content,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    }
  }
}