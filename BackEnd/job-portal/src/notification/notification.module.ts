import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { notificationSchema } from './entities/notification.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Notification', schema: notificationSchema}])],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
