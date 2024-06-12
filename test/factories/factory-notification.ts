import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';

import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaNotificationMapper } from '@/infra/database/prisma/mappers/prisma-notification-mapper';

export function factoryNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return notification;
}
@Injectable()
export class NotificationFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaNotification(data: Partial<NotificationProps> = {},): Promise<Notification> {
    const notification = factoryNotification(data);

    await this.prisma.notification.create({
      data: PrismaNotificationMapper.convertToNotificationPrisma(notification),
    })

    return notification;
  }
}