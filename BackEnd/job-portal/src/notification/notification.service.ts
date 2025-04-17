import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification') private readonly notificationModel: Model<Notification>,
  ){}


  async create(CreateNotificationDto: CreateNotificationDto): Promise<Notification>{
    const newNotification = new this.notificationModel(CreateNotificationDto);
    return newNotification.save();
  }
  async findByUser(UserId: string): Promise<Notification[]>{
    return this.notificationModel.find({user: UserId}).exec();
  }
  async marAsRead(notificationId: string): Promise<Notification>{
    return this.notificationModel.findByIdAndUpdate(notificationId, {read: true}, {new: true}).exec();
  }
  async delete(notificationId: string): Promise<void>{
    await this.notificationModel.findByIdAndDelete(notificationId).exec();
  }
}
