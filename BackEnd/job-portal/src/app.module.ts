import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CondidatesModule } from './condidates/condidates.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JobOfferModule } from './joboffer/joboffer.module';
import { JobApplicationModule } from './jobapplication/jobapplication.module';
import { TestJobApplicationModule } from './testjobapplication/testjobapplication.module';
import { CommentModule } from './comment/comment.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { NotificationModule } from './notification/notification.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MailModule } from './mailtrap/mailmodule';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017',{
      dbName: 'JobPortal',
    }),
    UserModule, AuthModule, AdminModule, CondidatesModule, CompanyModule, JobOfferModule, JobApplicationModule, TestJobApplicationModule, CommentModule, EvaluationModule, NotificationModule, DashboardModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
