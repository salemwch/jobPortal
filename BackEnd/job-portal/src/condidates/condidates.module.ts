import { forwardRef, Module } from '@nestjs/common';
import { CondidatesService } from './condidates.service';
import { CondidatesController } from './condidates.controller';
import { UserModule } from '../user/user.module';
import { EvaluationModule } from '../evaluation/evaluation.module';
import { JobApplicationModule } from '../jobapplication/jobapplication.module';
import { TestJobApplicationModule } from '../testjobapplication/testjobapplication.module';


@Module({
  imports:[   CondidatesModule,UserModule, EvaluationModule, forwardRef(() => JobApplicationModule, ), forwardRef(() => TestJobApplicationModule)
],
  controllers: [CondidatesController],
  providers: [CondidatesService],
})
export class CondidatesModule {}
