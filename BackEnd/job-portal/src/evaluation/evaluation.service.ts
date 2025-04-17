import { Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evaluation } from './entities/evaluation.entity';

@Injectable()
export class EvaluationService {
 constructor(
  @InjectModel('Evaluation') private evaluationModel : Model<Evaluation>
 ){}
 async createEvaluation(condidateId: string, companyId: string, rating: number, review: string): Promise<Evaluation>{
  const evaluation = new this.evaluationModel({condidateId, companyId,rating,review});
  return evaluation.save();
 }
 async getEvaluationForCompany(companyId: string): Promise<Evaluation[]>{
  return this.evaluationModel.find({companyId}).exec();
 }
 async getEvaluationByCondidate(condidateId: string, companyId: string): Promise<Evaluation>{
  return this.evaluationModel.findOne({condidateId, companyId}).exec();
 }
 async deleteEvaluation(condidateId: string, companyId: string): Promise<void>{
  await this.evaluationModel.deleteOne({condidateId, companyId}).exec();
 }
}
