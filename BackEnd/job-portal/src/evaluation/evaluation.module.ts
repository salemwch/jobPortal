import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EvaluationSchema } from './entities/evaluation.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Evaluation', schema: EvaluationSchema
  }])],
  controllers: [EvaluationController],
  providers: [EvaluationService],
})
export class EvaluationModule {}
