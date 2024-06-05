import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/coreShared/entities/unique-entity-id';

import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'

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