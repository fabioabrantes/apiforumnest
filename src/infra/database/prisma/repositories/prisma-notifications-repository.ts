import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { INotificationsRepository } from '@/domain/notification/application/repositories/i-notifications-repository';
import { Notification } from '@/domain/notification/enterprise/entities/notification';

@Injectable()
export class PrismaNotificationsRepository implements INotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.convertToNotificationDomain(notification);
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.convertToNotificationPrisma(notification);

    await this.prisma.notification.create({
      data,
    });
  }

  async update(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.convertToNotificationPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: notification.id.toString(),
      },
      data,
    });
  }
}