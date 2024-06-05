import { Either, error, success } from '@/coreShared/either';
import { Notification } from '@/domain/notification/enterprise/entities/notification';
import { INotificationsRepository } from '../repositories/i-notifications-repository';
import { ResourceNotFoundError } from '@/coreShared/errors/resource-not-found-error';
import { NotAllowedError } from '@/coreShared/errors/not-allowed-error';

interface ReadNotificationUseCaseRequest {
  recipientId: string;
  notificationId: string;
}

type ReadNotificationUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: INotificationsRepository) { }

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository.findById(notificationId,);

    if (!notification) {
      return error(new ResourceNotFoundError());
    }

    if (recipientId !== notification.recipientId.toString()) {
      return error(new NotAllowedError());
    }

    notification.read();

    await this.notificationsRepository.update(notification);

    return success({ notification });
  }
}