import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { response } from 'express';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(
    @Res() response,
    @Body() createNotificationDto: CreateNotificationDto
  ) {
    try {
      const notification = await this.notificationService.create(
        createNotificationDto
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Notification created successfully',
        notification,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'notification create failed',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Get('user/:userId')
  async findByUser(@Res() response, @Param('userId') userId: string) {
    try {
      const notifications = await this.notificationService.findByUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'notification find successfully',
        notifications,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to find notification',
        error: (error as Error).message,
        statusCOde: 400,
      });
    }
  }
  @Patch(':id/read')
  async markAsRead(@Res() response, @Param('id') id: string) {
    try {
      const markRead = await this.notificationService.marAsRead(id);
      return response.status(HttpStatus.CREATED).json({
        message: 'notification marked as read',
        markRead,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to mark notification as read',
        errr: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Delete('id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deleteed = await this.notificationService.delete(id);
      return response.status(HttpStatus.OK).json({
        message: ' deleted notification DOne',
        deleteed,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'deleted notification failed',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
}
