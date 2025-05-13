import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTestJobApplicationDto } from './dto/createtestjobapplication.dto';
import { UpdateTestJobApplicationDto } from './dto/updatetestjobapplication.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IJobTest } from './interface/interfacetest';
import { JobOffer } from 'src/joboffer/entities/joboffer.entity';
import { Condidate } from 'src/condidates/entities/condidate.entity';
import { ICondidate } from 'src/condidates/Interface/interface';
import { TestJobApplication } from './entities/testjobapplication.entity';
import { JobApplication } from 'src/jobapplication/entities/jobapplication.entity';
import { Mode } from 'fs';
import { IUser } from 'src/user/Interface/IUser';

@Injectable()
export class TestJobApplicationService {
  constructor(
    @InjectModel('TestJobApplication')
    private readonly TestJobApplicationModel: Model<IJobTest>,
    @InjectModel('JobOffer') private readonly jobOfferModel: Model<JobOffer>,
    @InjectModel('condidate')
    private readonly condidateModel: Model<ICondidate>,
    @InjectModel('user') private readonly userModel: Model<IUser>
  ) {}
  async create(
    createJobTestDto: CreateTestJobApplicationDto
  ): Promise<IJobTest> {
    const condidate = await this.userModel.findOne({
      _id: new Types.ObjectId(createJobTestDto.condidate),
      role: 'condidate',
    });
    if (!condidate) {
      throw new NotFoundException('condidate not found or invalid role');
    }
    const newJobTest = await new this.TestJobApplicationModel(createJobTestDto);
    const savedTest = await newJobTest.save();

    const updatedJobOffer = await this.jobOfferModel.findByIdAndUpdate(
      createJobTestDto.jobOffer,
      { $push: { testJobApplication: savedTest._id } },
      { new: true }
    );
    await this.condidateModel.findByIdAndUpdate(
      createJobTestDto.condidate,
      { $push: { testJobApplication: savedTest._id } },
      { new: true }
    );

    if (!updatedJobOffer) {
      throw new BadRequestException(
        `jobOffer with ID ${createJobTestDto.jobOffer} not found`
      );
    }
    return savedTest;
  }
  async findAll(): Promise<IJobTest[]> {
    return this.TestJobApplicationModel.find();
  }
  async findOnetest(id: string): Promise<IJobTest> {
    const jobTest = await this.TestJobApplicationModel.findById(id);
    if (!jobTest) {
      throw new BadRequestException(`job Test with Id ${id} not found`);
    }
    return jobTest;
  }
  async update(
    id: string,
    updatejobTestDto: UpdateTestJobApplicationDto
  ): Promise<IJobTest> {
    const updateJobTest = await this.TestJobApplicationModel.findByIdAndUpdate(
      id,
      updatejobTestDto
    );
    if (!updateJobTest) {
      throw new NotFoundException(
        `job test with Id ${id} not found for update`
      );
    }
    return updateJobTest;
  }
  async delete(id: string): Promise<IJobTest> {
    const deleteJobTest =
      await this.TestJobApplicationModel.findByIdAndDelete(id);
    if (!deleteJobTest) {
      throw new BadRequestException(
        `job test with the id ${id} not found to delete`
      );
    }
    return deleteJobTest;
  }
  async findTestsByJobOfferId(jobOfferId: string) {
    const tests = await this.TestJobApplicationModel.find({
      jobOffer: new Types.ObjectId(jobOfferId),
    }).populate('jobOffer');
    if (!tests?.length) {
      throw new NotFoundException(
        `no test found for job offer id ${jobOfferId}`
      );
    }
    return tests;
  }
  async evaluateAnswer(questionId: string, answer: string): Promise<boolean> {
    const question = await this.TestJobApplicationModel.findOne(
      { 'questions._id': questionId },
      { 'questions.$': 1 }
    );
    if (!question || !question.questions || question.questions.length === 0) {
      throw new NotFoundException(`Qesution with id ${questionId} not found`);
    }
    const correctAnswer = question.questions[0].correctAnswer;
    return correctAnswer === answer;
  }
  async findOneTestByJobOfferId(jobOfferId: string): Promise<IJobTest> {
    const test = await this.TestJobApplicationModel.findOne({
      jobOffer: new Types.ObjectId(jobOfferId),
    });

    if (!test) {
      throw new NotFoundException(
        `No test found for job offer id ${jobOfferId}`
      );
    }

    return test;
  }
}
