import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { interfaceAdmin } from './Interface/InterfaceAdmin';
import * as argon2 from 'argon2';
import { JobOfferService } from 'src/joboffer/joboffer.service';
import { JobApplicationService } from 'src/jobapplication/jobapplication.service';
import { IUser } from 'src/user/Interface/IUser';
import { UserRole } from 'src/userRole/userRole';
import { ICondidate } from 'src/condidates/Interface/interface';
import { ICompany } from 'src/company/Interface/Interface';
import { IJobOffer } from 'src/joboffer/interface/InterfaceJobOffer';
import { IJobApplication } from 'src/jobapplication/interface/interfaceJobApplication';
import { ApplicationStatus } from 'src/jobapplication/enumApplication';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('admin') private adminModel: Model<interfaceAdmin>,
    @InjectModel('condidate') private condidateModel: Model<ICondidate>,
    @InjectModel('company') private companyModel: Model<ICompany>,
    private readonly jobOfferService: JobOfferService,
    @InjectModel(User.name) private userModel: Model<IUser>,
    private readonly jobApplicationService: JobApplicationService
  ) {}
  async create(createAdminDto: CreateAdminDto): Promise<interfaceAdmin> {
    const hash = await this.hashdata(createAdminDto.password);
    const refreshToken = await this.hashdata('refreshTokenData');
    const createAdmin = await new this.adminModel({
      ...createAdminDto,
      password: hash,
      refreshToken,
      role: UserRole.ADMIN,
    });
    return createAdmin.save();
  }
  hashdata(data: string) {
    return argon2.hash(data);
  }
  async findAllUsers(): Promise<interfaceAdmin[]> {
    return this.adminModel.find();
  }
  async updateProfile(
    id: string,
    updateAdmin: UpdateAdminDto
  ): Promise<interfaceAdmin> {
    if (updateAdmin.password) {
      updateAdmin.password = await argon2.hash(updateAdmin.password);
    }
    const update = await this.adminModel.findByIdAndUpdate(id, updateAdmin, {
      new: true,
      runValidators: true,
    });
    if (!update) {
      throw new BadRequestException(`admin with id : ${id} not found`);
    }
    return update;
  }

  async deletAdmin(id: string): Promise<interfaceAdmin> {
    const deleteAdmin = await this.adminModel.findByIdAndDelete(id);
    return deleteAdmin;
  }
  async findAllAdmins(): Promise<interfaceAdmin[]> {
    return this.adminModel.find({ role: UserRole.ADMIN });
  }
  async approvedCompany(companyId: string): Promise<ICompany> {
    const company = await this.companyModel.findByIdAndUpdate(
      companyId,
      { status: 'approved' },
      { new: true, runValidators: true }
    );
    if (!company) {
      throw new BadRequestException(`company with id : ${companyId} not found`);
    }
    return company;
  }
  async rejectCompany(companyId: string): Promise<ICompany> {
    const company = await this.companyModel.findByIdAndUpdate(
      companyId,
      { status: 'rejected' },
      { new: true, runValidators: true }
    );
    if (!company) {
      throw new BadRequestException(`company with id ${companyId} not found`);
    }
    return company;
  }
  async approvedCondidate(condidateId: string): Promise<ICondidate> {
    const condidate = await this.condidateModel.findByIdAndUpdate(
      condidateId,
      { status: 'approved' },
      { new: true, runValidators: true }
    );
    if (!condidate) {
      throw new BadRequestException(
        `condidate with id ${condidateId} not found`
      );
    }
    return condidate;
  }

  async rejectCondidate(condidateId: string): Promise<ICondidate> {
    const condidate = await this.condidateModel.findByIdAndUpdate(
      condidateId,
      { status: 'rejected' },
      { new: true, runValidators: true }
    );
    if (!condidate) {
      throw new BadRequestException(
        `condidate with id ${condidateId} not found`
      );
    }
    return condidate;
  }
  async getCondidateByID(condidateId: string): Promise<ICondidate> {
    const condidate = await this.condidateModel
      .findById(condidateId)
      .populate('jobApplications')
      .populate('testJobApplication');
    if (!condidate) {
      throw new BadRequestException(
        `condidate with id ${condidateId} not found`
      );
    }
    return condidate;
  }
  async getCompanyById(companyId: string): Promise<ICompany> {
    const company = await this.companyModel
      .findById(companyId)
      .populate('jobApplications')
      .populate('testJobApplication');
    if (!company) {
      throw new BadRequestException(`company with id ${companyId} not found`);
    }
    return company;
  }
  async approveJobOffer(jobOfferId: string): Promise<IJobOffer> {
    const updatedJobOffer = await this.jobOfferService.update(jobOfferId, {
      status: 'approved',
    });
    if (!updatedJobOffer) {
      throw new NotFoundException(`job Offer with id ${jobOfferId} not found`);
    }
    return updatedJobOffer;
  }
  async rejectJobOffer(jobOfferId: string): Promise<IJobOffer> {
    const updatedJobOffer = await this.jobOfferService.update(jobOfferId, {
      status: 'rejected',
    });
    if (!updatedJobOffer) {
      throw new NotFoundException(`job Offfer with id ${jobOfferId} not found`);
    }
    return updatedJobOffer;
  }
  async approveJobApplication(
    jobApplicationId: string
  ): Promise<IJobApplication> {
    const updatedApplication = await this.jobApplicationService.updateStatus(
      jobApplicationId,
      ApplicationStatus.Approved
    );
    if (!updatedApplication) {
      throw new NotFoundException(
        `job Application with Id ${jobApplicationId} not found`
      );
    }
    return updatedApplication;
  }
  async rejectApplication(jobApplicationId: string): Promise<IJobApplication> {
    const updatedApplication = await this.jobApplicationService.update(
      jobApplicationId,
      { status: ApplicationStatus.Rejected }
    );
    if (!updatedApplication) {
      throw new NotFoundException(
        ` job application with id  ${jobApplicationId} not found`
      );
    }
    return updatedApplication;
  }
  async findAdminById(id: string): Promise<interfaceAdmin> {
    return this.adminModel.findById(id);
  }
  async findUserById(id: string): Promise<IUser> {
    const user = await this.userModel
      .findById(id)
      .select('name email location role');
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
