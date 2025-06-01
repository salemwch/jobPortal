import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from 'src/user/user.module';
import { JobOfferModule } from 'src/joboffer/joboffer.module';
import { JobApplicationModule } from 'src/jobapplication/jobapplication.module';
import { TestJobApplicationModule } from 'src/testjobapplication/testjobapplication.module';

@Module({
  imports: [
    JobOfferModule,
    forwardRef(() => JobApplicationModule),
    TestJobApplicationModule,
    UserModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
