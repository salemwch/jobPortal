import { forwardRef, Module } from '@nestjs/common';
import { JobOfferService } from './joboffer.service';
import { JobOfferController } from './joboffer.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JobOfferSchema } from './entities/joboffer.entity';
import { CompanyModule } from 'src/company/company.module';
import { JobApplicationModule } from 'src/jobapplication/jobapplication.module';
import { TestJobApplicationModule } from 'src/testjobapplication/testjobapplication.module';
import { MailModule } from 'src/mailtrap/mailmodule';
console.log('MailModule:', MailModule);
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'JobOffer', schema: JobOfferSchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => JobApplicationModule),
    forwardRef(() => TestJobApplicationModule),
    MailModule,
    forwardRef(() => CompanyModule),
    NotificationModule,
  ],
  controllers: [JobOfferController],
  providers: [JobOfferService],
  exports: [JobOfferService, MongooseModule],
})
export class JobOfferModule {}
