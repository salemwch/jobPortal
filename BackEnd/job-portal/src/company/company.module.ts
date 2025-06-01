import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { UserModule } from '../user/user.module';
import { TestJobApplicationModule } from 'src/testjobapplication/testjobapplication.module';
import { JobOfferModule } from 'src/joboffer/joboffer.module';
import { MailModule } from 'src/mailtrap/mailmodule';

import { JobApplicationModule } from 'src/jobapplication/jobapplication.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => TestJobApplicationModule),
    forwardRef(() => MailModule),
    forwardRef(() => JobOfferModule),
    forwardRef(() => JobApplicationModule),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
