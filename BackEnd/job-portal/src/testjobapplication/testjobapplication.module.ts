import { forwardRef, Module } from '@nestjs/common';
import { TestJobApplicationService } from './testjobapplication.service';
import { TestJobApplicationController } from './testjobapplication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobTestSchema,
  TestJobApplication,
} from './entities/testjobapplication.entity';
import { JobOfferModule } from 'src/joboffer/joboffer.module';
import { JobApplicationModule } from 'src/jobapplication/jobapplication.module';
import { CondidatesModule } from 'src/condidates/condidates.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TestJobApplication', schema: JobTestSchema },
    ]),
    forwardRef(() => JobOfferModule),
    forwardRef(() => JobApplicationModule),
    UserModule,
  ],
  controllers: [TestJobApplicationController],
  providers: [TestJobApplicationService],
  exports: [TestJobApplicationService, MongooseModule],
})
export class TestJobApplicationModule {}
