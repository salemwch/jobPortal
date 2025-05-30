import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobOfferDto } from './dto/createjoboffer.dto';
import { UpdateJobOfferDto } from './dto/updatejoboffer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IJobOffer } from './interface/InterfaceJobOffer';
import { JobOffer } from './entities/joboffer.entity';
import { ICompany } from 'src/company/Interface/Interface';
import { IJobTest } from 'src/testjobapplication/interface/interfacetest';
import { TestJobApplication } from 'src/testjobapplication/entities/testjobapplication.entity';
import { ICondidate } from 'src/condidates/Interface/interface';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class JobOfferService {
  constructor(
    @InjectModel('JobOffer') private jobOfferModel: Model<IJobOffer>,
    @InjectModel('company') private readonly companyModel: Model<ICompany>,
    @InjectModel('condidate')
    private readonly condidateModel: Model<ICondidate>,
    @InjectModel('TestJobApplication')
    private testJobApplicationModel: Model<IJobTest>,
    private readonly notificationService: NotificationService
  ) {}

  async create(createJobOfferDto: CreateJobOfferDto): Promise<IJobOffer> {
    const companyId = createJobOfferDto.company;
    const existCompany = await this.companyModel.findById(companyId);
    if (!existCompany) {
      throw new BadRequestException(
        `Company with id ${companyId} does not exist`
      );
    }
    if (existCompany.status !== 'approved') {
      throw new BadRequestException(
        `Company with id ${companyId} is not approved to create job offers`
      );
    }
    // 1. Save job offer
    const newJobOffer = new this.jobOfferModel(createJobOfferDto);
    const savedJobOffer = await newJobOffer.save();
    // 2. Update company with job offer reference
    await this.companyModel.findByIdAndUpdate(
      companyId,
      { $push: { jobOffers: savedJobOffer._id } },
      { new: true }
    );
    // 3. Get condidates from same location
    const condidates = await this.condidateModel.find({
      location: createJobOfferDto.location,
    });
    // 4. Notify matching condidates based on skills
    for (const condidate of condidates) {
      const condidateSkills = condidate.skills || [];
      const jobSkills = createJobOfferDto.requiredSkills || [];
      const skillMatch = condidateSkills.some(skills =>
        jobSkills.includes(skills)
      );
      if (skillMatch) {
        const message = `A new job offer matching your skills and location has been posted by ${existCompany.name}`;
        const jobOfferId = savedJobOffer._id as Types.ObjectId;
        await this.notificationService.create({
          user: condidate._id.toString(),
          message,
          type: 'jobMatch',
          jobOffer: jobOfferId.toString(),
        });
      }
    }
    return savedJobOffer;
  }
  async update(
    id: string,
    updateJobOfferdto: UpdateJobOfferDto
  ): Promise<IJobOffer> {
    const updatedJobOffer = await this.jobOfferModel.findByIdAndUpdate(
      id,
      updateJobOfferdto,
      { new: true }
    );
    if (!updatedJobOffer) {
      throw new BadRequestException(`job Offer With id : ${id} not found`);
    }
    return updatedJobOffer;
  }
  async findById(id: string): Promise<IJobOffer> {
    try {
      const jobOffer = await this.jobOfferModel
        .findById(id)
        .populate('company');
      // Check if the job offer was found
      if (!jobOffer) {
        // If not found, throw an error with a detailed message
        console.error(`JobOffer with ID: ${id} not found`);
        throw new BadRequestException(`Job offer with id: ${id} not found`);
      }

      // Return the found job offer
      return jobOffer;
    } catch (error) {
      // Log detailed error message before throwing it
      console.error(
        `Error occurred while fetching JobOffer with ID: ${id}`,
        error
      );
      throw new Error(`Error fetching job offer: ${(error as Error).stack}`);
    }
  }

  async findAll(): Promise<IJobOffer[]> {
    return this.jobOfferModel
      .find()
      .populate('company', 'image role specialty name ')
      .exec();
  }

  async delete(id: string): Promise<IJobOffer> {
    const deleteJobOffer = await this.jobOfferModel.findByIdAndDelete(id);
    if (!deleteJobOffer) {
      throw new BadRequestException(`job offer with id : ${id} not found`);
    }
    return deleteJobOffer;
  }
  async search(query: any): Promise<IJobOffer[]> {
    const filters: any = {};
    if (query.title) {
      filters.title = { $regex: query.title, $options: 'i' };
    }
    if (query.location) {
      filters.location = { $regex: query.location, $options: 'i' };
    }
    if (query.salaryMin || query.salaryMax) {
      filters.salary = {};
      if (query.salaryMin) filters.salary.$gte = query.salaryMin;
      if (query.salaryMax) filters.salary.$lte = query.salaryMax;
    }
    if (query.requirements) {
      filters.requirements = { $regex: query.requirements, $options: 'i' };
    }
    if (query.companyId) {
      filters.company = query.companyId;
    }
    try {
      return this.jobOfferModel.find(filters).populate('company').exec();
    } catch (error) {
      throw new BadRequestException('error during searc', error);
    }
  }
  async incrementViewCount(id: string): Promise<JobOffer> {
    const jobOffer = await this.jobOfferModel.findById(id);
    console.log('Updated JobOffer with Test Applications:', jobOffer);
    if (!jobOffer) {
      throw new BadRequestException(`job offer with id:  ${id} not found`);
    }
    return this.jobOfferModel.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
  }

  async findMostViewd(limit: number = 5): Promise<IJobOffer[]> {
    return this.jobOfferModel
      .find()
      .sort({ viewCount: -1 })
      .limit(limit)
      .exec();
  }
  async findCompanybyID(companyId: string): Promise<IJobOffer[]> {
    return this.jobOfferModel.find({ company: companyId }).exec();
  }
  async updatedStatusOffer(
    id: string,
    updateDataDto: UpdateJobOfferDto
  ): Promise<IJobOffer> {
    const updatedstatus = await this.jobOfferModel.findByIdAndUpdate(
      id,
      updateDataDto,
      { new: true }
    );
    if (!updatedstatus) {
      throw new BadRequestException(
        `job Offer with id : ${id} not found to update`
      );
    }
    return updatedstatus;
  }
  async findTestsByJobOfferId(
    jobOfferId: string
  ): Promise<TestJobApplication[]> {
    return this.testJobApplicationModel.find({ jobOffer: jobOfferId });
  }
}
