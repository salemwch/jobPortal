import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NotificationGateway } from './notification.getway';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
    private readonly notificationGateway: NotificationGateway
  ) {}
  //“When a new notification is created in the backend, save it to MongoDB and immediately send it to the frontend via WebSocket
  async create(
    CreateNotificationDto: CreateNotificationDto
  ): Promise<Notification> {
    //Create a new document from the data (user, message, jobOffer), converting the IDs to MongoDB ObjectIds
    const newNotification = new this.notificationModel({
      user: new Types.ObjectId(CreateNotificationDto.user),
      message: CreateNotificationDto.message,
      type: CreateNotificationDto.type || 'info',
      jobOffer: new Types.ObjectId(CreateNotificationDto.jobOffer),
    });
    //Save the notification to the MongoDB database
    const saved = await newNotification.save();
    //“After saving, push the notification to the user’s WebSocket room in real-time
    this.notificationGateway.notifyUser(CreateNotificationDto.user, saved);

    return saved;
  }
  async findByUser(UserId: string): Promise<Notification[]> {
    return this.notificationModel.find({ user: UserId }).exec();
  }
  async markAsRead(notificationId: string): Promise<Notification> {
    return this.notificationModel
      .findByIdAndUpdate(notificationId, { read: true }, { new: true })
      .exec();
  }
  async delete(notificationId: string): Promise<void> {
    await this.notificationModel.findByIdAndDelete(notificationId).exec();
  }
}
