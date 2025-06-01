import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { JobOffer } from 'src/joboffer/entities/joboffer.entity';
import { JobApplication } from 'src/jobapplication/entities/jobapplication.entity';
import { TestJobApplication } from 'src/testjobapplication/entities/testjobapplication.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel('JobOffer') private readonly jobOfferModel: Model<JobOffer>,
    @InjectModel('JobApplication')
    private readonly jobApplicationModel: Model<JobApplication>,
    @InjectModel('TestJobApplication')
    private readonly testJobApplicationModel: Model<TestJobApplication>
  ) {}
  async getDashboardsStats(): Promise<CreateDashboardDto> {
    const totalUsers = await this.userModel.countDocuments();
    const totalCompanies = await this.userModel.countDocuments({
      role: 'company',
    });
    const totalCondidates = await this.userModel.countDocuments({
      role: 'condidate',
    });

    const totalJobOffers = await this.jobOfferModel.countDocuments();
    const totalPendingJobOffers = await this.jobOfferModel.countDocuments({
      status: 'pending',
    });
    const totalApprovedJobOffers = await this.jobOfferModel.countDocuments({
      status: 'approved',
    });
    const totalRejectedJobOffers = await this.jobOfferModel.countDocuments({
      status: 'rejected',
    });

    const totalJobApplications =
      await this.jobApplicationModel.countDocuments();
    const totalPendingJobApplications =
      await this.jobApplicationModel.countDocuments({ status: 'pending' });
    const totalApprovedJobApplications =
      await this.jobApplicationModel.countDocuments({ status: 'approved' });
    const totalRejectedJobApplications =
      await this.jobApplicationModel.countDocuments({ status: 'rejected' });
    7;

    const totalTestJobApplication =
      await this.testJobApplicationModel.countDocuments({});

    return {
      totalUsers,
      totalCompanies,
      totalCondidates,
      totalJobOffers,
      totalPendingJobOffers,
      totalApprovedJobOffers,
      totalRejectedJobOffers,
      totalJobApplications,
      totalPendingJobApplications,
      totalApprovedJobApplications,
      totalRejectedJobApplications,
      totalTestJobApplication,
    };
  }
}
