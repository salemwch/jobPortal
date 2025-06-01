import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICompany } from './Interface/Interface';
import * as argon2 from 'argon2';
import { IUser } from '../user/Interface/IUser';
import { UserRole } from '../userRole/userRole';
import { IJobTest } from 'src/testjobapplication/interface/interfacetest';
import { IJobOffer } from 'src/joboffer/interface/InterfaceJobOffer';
import { IJobApplication } from 'src/jobapplication/interface/interfaceJobApplication';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('company') private readonly companyModel: Model<ICompany>,
    @InjectModel(User.name) private readonly userModel: Model<IUser>,
    @InjectModel('TestJobApplication')
    private testJobApplicationModel: Model<IJobTest>,
    @InjectModel('JobOffer') private jobOfferModel: Model<IJobOffer>,
    @InjectModel('JobApplication')
    private jobApplicationModel: Model<IJobApplication>
  ) {}
  async createCompany(createCompanyDto: CreateCompanyDto): Promise<ICompany> {
    const existingCompany = await this.companyModel.findOne({
      email: createCompanyDto.email,
    });
    if (existingCompany) {
      throw new BadRequestException(
        `condidate with email ${createCompanyDto.email} already exist`
      );
    }
    const hash = await this.hashdata(createCompanyDto.password);
    const refreshToken = await this.hashdata('refreshTokenData');
    const newCompany = new this.companyModel({
      ...createCompanyDto,
      password: hash,
      refreshToken,
      role: UserRole.COMPANY,
    });
    return newCompany.save();
  }
  hashdata(data: string) {
    return argon2.hash(data);
  }
  async getCompanyById(id: string): Promise<ICompany> {
    const getCompanyById = await this.companyModel
      .findById(id)
      .populate('jobOffers')
      .exec();
    if (!getCompanyById) {
      throw new BadRequestException(`company with id ${id} not found`);
    }
    return getCompanyById;
  }
  async searchCompanies(query: string) {
    return this.companyModel.find({
      $or: [
        { email: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
      ],
    });
  }

  async updateCompany(
    id: string,
    updateCompanyDto: UpdateCompanyDto
  ): Promise<ICompany> {
    const data = { ...updateCompanyDto } as any;

    if (data.password) {
      data.password = await argon2.hash(data.password);
    }
    delete data.jobOffers;
    try {
      const updatedCompany = await this.companyModel
        .findByIdAndUpdate(
          id,
          { $set: data },
          { new: true, runValidators: true }
        )
        .lean();
      if (!updatedCompany) {
        throw new BadRequestException(`Company with ID ${id} not found`);
      }
      return updatedCompany;
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.email) {
        throw new BadRequestException('This email is already in use.');
      }
      throw error;
    }
  }

  async deleteCompany(id: string): Promise<ICompany> {
    const company = await this.companyModel.findByIdAndDelete(id);
    if (!company) {
      throw new BadRequestException(`Company with id ${id} not found`);
    }

    const jobOffers = await this.jobOfferModel.find({ company: id });

    const jobOfferIds = jobOffers.map(offer => offer._id);

    await this.testJobApplicationModel.deleteMany({
      jobOffer: { $in: jobOfferIds },
    });

    await this.jobOfferModel.deleteMany({ company: id });

    await this.companyModel.findByIdAndDelete(id);

    return company;
  }

  async findAll(): Promise<ICompany[]> {
    const company = await this.companyModel
      .find({ role: UserRole.COMPANY })
      .populate('jobOffers')
      .exec();
    if (company.length === 0) {
      throw new BadRequestException('No companies found');
    }
    return company;
  }
  async updateDesiredFields(
    id: string,
    updateDto: UpdateCompanyDto
  ): Promise<ICompany> {
    const company = await this.companyModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    if (!company) {
      throw new BadRequestException(`company with id ${id} not found`);
    }
    return company;
  }
  async incrementViewCount(id: string): Promise<ICompany> {
    const company = await this.companyModel.findById(id);
    if (!company) {
      throw new BadRequestException(`company with id ${id} not found`);
    }
    return this.companyModel.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
  }
  async findMostViwed(): Promise<ICompany | null> {
    return this.companyModel.findOne().sort({ viewCount: -1 }).exec();
  }
  async getCompanyDashboardStats(companyId: string) {
    const company = await this.companyModel.findById(companyId);
    if (!company) throw new BadRequestException('Company not found');

    const jobOffers = await this.jobOfferModel.find({ company: companyId });
    const jobOfferIds = jobOffers.map(j => j._id);
    const totalApplicationss = await this.jobApplicationModel.countDocuments({
      jobOffer: { $in: jobOfferIds },
    });

    return {
      totalJobOffers: jobOffers.length,
      totalJobApplications: totalApplicationss,
      profileViews: company.viewCount,
    };
  }
}
