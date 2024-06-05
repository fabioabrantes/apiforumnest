import { INotificationsRepository } from '@/domain/notification/application/repositories/i-notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository implements INotificationsRepository {
  public notifications: Notification[] = []

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findById(id: string) {
    const notification = this.notifications.find((item) => item.id.toString() === id);

    if (!notification) {
      return null;
    }

    return notification;
  }

  async update(notification: Notification) {
    const itemIndex = this.notifications.findIndex((item) => item.id === notification.id,);

    this.notifications[itemIndex] = notification;
  }
}