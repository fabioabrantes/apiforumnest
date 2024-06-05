import { Notification } from '@/domain/notification/enterprise/entities/notification';



export interface INotificationsRepository {
  create(notification: Notification): Promise<void>;
  findById(id: string): Promise<Notification | null>;
  update(notification: Notification): Promise<void>;
}