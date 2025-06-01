import { forwardRef, Module } from '@nestjs/common';
import { CondidatesService } from './condidates.service';
import { CondidatesController } from './condidates.controller';
import { UserModule } from '../user/user.module';
import { EvaluationModule } from '../evaluation/evaluation.module';
import { JobApplicationModule } from '../jobapplication/jobapplication.module';
import { TestJobApplicationModule } from '../testjobapplication/testjobapplication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CondidateSchema } from './entities/condidate.entity';

@Module({
  imports: [
    forwardRef(() => UserModule),
    EvaluationModule,
    forwardRef(() => JobApplicationModule),
    forwardRef(() => TestJobApplicationModule),
  ],
  controllers: [CondidatesController],
  providers: [CondidatesService],
  exports: [CondidatesService],
})
export class CondidatesModule {}
