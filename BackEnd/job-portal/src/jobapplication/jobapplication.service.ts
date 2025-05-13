import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IJobApplication } from './interface/interfaceJobApplication';
import { TestJobApplicationService } from 'src/testjobapplication/testjobapplication.service';
import { ApplicationStatus } from './enumApplication';
import { IUser } from 'src/user/Interface/IUser';
import { IJobOffer } from 'src/joboffer/interface/InterfaceJobOffer';
import { ICondidate } from 'src/condidates/Interface/interface';
import { IJobTest } from 'src/testjobapplication/interface/interfacetest';
import { NotificationService } from 'src/notification/notification.service';
import { MailService } from 'src/mailtrap/mailservice';
import { Company } from 'src/company/entities/company.entity';
type PopulatedJobOffer = IJobOffer & { company: Company };

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectModel('JobApplication')
    private readonly jobApplicationModel: Model<IJobApplication>,
    private readonly testJobApplicationService: TestJobApplicationService,
    @InjectModel('JobOffer') private readonly jobOfferModel: Model<IJobOffer>,
    @InjectModel('user') private readonly userModel: Model<IUser>,
    @InjectModel('condidate')
    private readonly condidateModel: Model<ICondidate>,
    @InjectModel('TestJobApplication')
    private readonly testJobApplicationModel: Model<IJobTest>,
    private readonly notificationService: NotificationService,
    private readonly mailService: MailService
  ) {}
  async create(
    createJobApplication: CreateJobApplicationDto
  ): Promise<IJobApplication> {
    const condidate = await this.userModel.findOne({
      _id: new Types.ObjectId(createJobApplication.condidate),
      role: 'condidate',
    });
    if (!condidate) {
      throw new NotFoundException('Condidate not found or invalid role');
    }

    const existingApplication = await this.jobApplicationModel.findOne({
      condidate: new Types.ObjectId(createJobApplication.condidate),
      jobOffer: new Types.ObjectId(createJobApplication.jobOffer),
    });
    if (existingApplication) {
      throw new BadRequestException(
        'This condidate has already applied for this job'
      );
    }
    const newJobApplication = new this.jobApplicationModel({
      ...createJobApplication,
      score: 0,
      status: ApplicationStatus.Pending,
      name: createJobApplication.name,
      location: createJobApplication.location,
      experience: createJobApplication.experience,
      motivationLetter: createJobApplication.motivationLetter,
      cvUrl: createJobApplication.cvUrl,
    });
    const savedApplication = await newJobApplication.save();

    await this.jobOfferModel.findByIdAndUpdate(
      createJobApplication.jobOffer,
      { $push: { jobApplications: savedApplication._id } },
      { new: true }
    );

    await this.condidateModel.findByIdAndUpdate(
      createJobApplication.condidate,
      { $push: { jobApplications: savedApplication._id } },
      { new: true }
    );

    const jobOfferPopulated = (await this.jobOfferModel
      .findById(createJobApplication.jobOffer)
      .populate('company', 'name email _id')
      .lean()
      .exec()) as unknown as PopulatedJobOffer;

    if (!jobOfferPopulated?.company?.email) {
      throw new Error('Company email not found');
    }
    if (!jobOfferPopulated?.company?._id) {
      throw new Error('Company ID not found for notification');
    }
    // ✅ Send a notification to the company about the new application
    await this.notificationService.create({
      user: jobOfferPopulated.company._id.toString(), // target company user
      message: `${createJobApplication.name} has applied to your job offer "${jobOfferPopulated.title}".`,
      jobOffer: jobOfferPopulated._id.toString(),
      type: 'application', // optional, or use 'info'
    });
    const companyEmail = jobOfferPopulated.company.email;
    await this.mailService.sendJobApplicationEmail({
      name: createJobApplication.name,
      location: createJobApplication.location,
      experience: createJobApplication.experience,
      motivationLetter: createJobApplication.motivationLetter,
      cvUrl: `${process.env.BASE_URL}/uploads/${createJobApplication.cvUrl}`,
      jobOffer: jobOfferPopulated,
      to: 'salemwachwacha1997@gmail.com',
    });

    return savedApplication;
  }
  async createForJob(
    jobOfferId: string,
    createJobApplicationDto: CreateJobApplicationDto
  ) {
    console.log(
      `Applying for job offer with ID: ${jobOfferId}`,
      createJobApplicationDto
    );
    return {
      message: `Application for job offer ${jobOfferId} submitted successfully!`,
    };
  }

  async findALL(): Promise<IJobApplication[]> {
    return this.jobApplicationModel.find();
  }
  async findOneJob(id: string): Promise<IJobApplication> {
    const findOneJobApplication = await this.jobApplicationModel.findById(id);
    if (!findOneJobApplication) {
      throw new BadRequestException(
        `job application with thd id ${id} not found`
      );
    }
    return findOneJobApplication;
  }
  async update(id: string, updateJobApplication: UpdateJobApplicationDto) {
    const updatedJobApplication =
      await this.jobApplicationModel.findByIdAndUpdate(
        id,
        updateJobApplication,
        { new: true }
      );
    if (!updatedJobApplication) {
      throw new NotFoundException(
        ` job application with the id ${id} not found`
      );
    }
    return updatedJobApplication;
  }
  async delete(id: string): Promise<IJobApplication> {
    const deletedJobApplication =
      await this.jobApplicationModel.findByIdAndDelete(id);
    if (!deletedJobApplication) {
      throw new BadRequestException(
        `job application with the id ${id} not found`
      );
    }
    return deletedJobApplication;
  }
  async evaluateTestResult(
    applicationId: string,
    testResultDto: { questionId: string; answer: string }
  ): Promise<IJobApplication> {
    const application = await this.jobApplicationModel.findById(applicationId);
    if (!application) {
      throw new NotFoundException(
        `job application with Id ${applicationId} not found`
      );
    }
    const test = application.testResults.find(
      t => t.questionId === testResultDto.questionId
    );
    if (!test) {
      throw new NotFoundException(
        `test with Id ${testResultDto.questionId} not found in application`
      );
    }
    if (test.answer && test.isCorrect !== null) {
      throw new BadGatewayException('this test has already been evaluated');
    }
    const isCorrect = await this.testJobApplicationService.evaluateAnswer(
      testResultDto.questionId,
      testResultDto.answer
    );
    if (typeof isCorrect !== 'boolean') {
      throw new Error('test evaluation did not return boolean');
    }
    test.answer = testResultDto.answer || null;
    test.isCorrect = isCorrect;
    await application.save();
    return application;
  }
  async submitfinaltestResult(
    applicationId: string
  ): Promise<{ status: string; score: number }> {
    const applicationn = await this.jobApplicationModel.findById(applicationId);
    if (!applicationn) {
      throw new NotFoundException(
        `job applciation with id ${applicationId} not found`
      );
    }
    const unansweredTests = applicationn.testResults.filter(
      t => t.answer === null
    );
    if (unansweredTests.length > 0) {
      throw new BadRequestException('some test have not been evaluated yet');
    }
    const totalQuestions = applicationn.testResults.length;
    const correctAnswer = applicationn.testResults.filter(
      t => t.isCorrect === true
    ).length;
    const scorePercentage = (correctAnswer / totalQuestions) * 100;
    const status = scorePercentage > 50 ? 'approved' : 'rejected';
    applicationn.status = status;
    applicationn.score = scorePercentage;
    await applicationn.save();
    await this.testJobApplicationModel.findByIdAndUpdate(
      applicationn.testJobApplication,
      { $set: { score: scorePercentage } },
      { new: true }
    );
    return { status, score: scorePercentage };
  }
  async findByStatus(status: string): Promise<IJobApplication[]> {
    return this.jobApplicationModel.find({ status }).exec();
  }
  async updateStatus(
    applicationId: string,
    status: string
  ): Promise<IJobApplication> {
    console.log('Received status:', status);
    console.log('Allowed values:', Object.values(ApplicationStatus));
    if (
      !Object.values(ApplicationStatus).includes(status as ApplicationStatus)
    ) {
      throw new BadRequestException('invalid status');
    }
    const applciations = await this.jobApplicationModel.findById(applicationId);
    if (!applciations) {
      throw new NotFoundException(
        `job application with id ${applicationId} not found`
      );
    }
    applciations.status = status;
    await applciations.save();
    return applciations;
  }
  async getRecentApplications(limit: number): Promise<IJobApplication[]> {
    return this.jobApplicationModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
}
