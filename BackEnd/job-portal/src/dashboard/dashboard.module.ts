import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/entities/user.entity';
import { JobApplicationSchema } from 'src/jobapplication/entities/jobapplication.entity';
import { JobOfferSchema } from 'src/joboffer/entities/joboffer.entity';
import { JobTestSchema, TestJobApplication } from 'src/testjobapplication/entities/testjobapplication.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'user', schema: UserSchema},
      {name: 'JobApplication', schema: JobApplicationSchema},
      {name: 'JobOffer', schema: JobOfferSchema},
      {name: 'TestJobApplication', schema: JobTestSchema}
    ])
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
