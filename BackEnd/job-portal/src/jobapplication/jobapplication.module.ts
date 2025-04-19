import { forwardRef, Module } from '@nestjs/common';
import { JobApplicationService } from './jobapplication.service';
import { JobApplicationController } from './jobapplication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobApplicationSchema } from './entities/jobapplication.entity';
import { TestJobApplicationModule } from 'src/testjobapplication/testjobapplication.module';
import {
  JobTestSchema,
  TestJobApplication,
} from 'src/testjobapplication/entities/testjobapplication.entity';
import { UserModule } from 'src/user/user.module';
import { JobOfferModule } from 'src/joboffer/joboffer.module';
import { NotificationModule } from 'src/notification/notification.module';
import { DashboardModule } from 'src/dashboard/dashboard.module';
import { MailModule } from 'src/mailtrap/mailmodule';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'JobApplication', schema: JobApplicationSchema },
    ]),
    forwardRef(() => TestJobApplicationModule),
    forwardRef(() => JobOfferModule),
    UserModule,
    NotificationModule,
    DashboardModule,
    forwardRef(() => MailModule),
  ],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
  exports: [JobApplicationService],
})
export class JobApplicationModule {}
