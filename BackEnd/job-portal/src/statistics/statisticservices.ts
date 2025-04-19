import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from 'express';
import { Model } from 'mongoose';
import { Company } from 'src/company/entities/company.entity';
import { Condidate } from 'src/condidates/entities/condidate.entity';
import { JobOffer } from 'src/joboffer/entities/joboffer.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel('JobOffer') private jobOfferModel: Model<JobOffer>,
    @InjectModel('Application') private applicationModel: Model<Application>,
    @InjectModel('Company') private companyModel: Model<Company>,
    @InjectModel('condidate') private condidateModel: Model<Condidate>
  ) {}

  async getPlatformStatistics() {
    const jobOffersCount = await this.jobOfferModel.countDocuments();
    const applicationsCount = await this.applicationModel.countDocuments();
    const companiesCount = await this.companyModel.countDocuments();
    const condidateCount = await this.condidateModel.countDocuments();
    return {
      jobOffersCount,
      applicationsCount,
      companiesCount,
      condidateCount,
    };
  }
}
