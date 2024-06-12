import { Notification } from '@/domain/notification/enterprise/entities/notification';



export abstract class INotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(id: string): Promise<Notification | null>;
  abstract update(notification: Notification): Promise<void>;
}