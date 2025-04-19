import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateCondidateDto } from './dto/create-condidate.dto';
import { UpdateCondidateDto } from './dto/update-condidate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ICondidate } from './Interface/interface';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { UserRole } from '../userRole/userRole';
import { IUser } from '../user/Interface/IUser';
import { IJobTest } from '../testjobapplication/interface/interfacetest';

@Injectable()
export class CondidatesService {
  constructor(
    @InjectModel('condidate')
    private readonly condidateModel: Model<ICondidate>,
    @InjectModel('user') private readonly userModel: Model<IUser>,
    @InjectModel('TestJobApplication')
    private readonly testJobApplicationModel: Model<IJobTest>
  ) {}
  async create(createCondidateDto: CreateCondidateDto): Promise<ICondidate> {
    const existingCondidate = await this.condidateModel.findOne({
      email: createCondidateDto.email,
    });
    if (existingCondidate) {
      throw new BadRequestException(
        `condidate with email ${createCondidateDto.email} already exist`
      );
    }
    const hash = await this.hashdata(createCondidateDto.password);
    const refreshToken = await this.hashdata('refreshTokenData');
    const newCondidate = await new this.condidateModel({
      ...createCondidateDto,
      password: hash,
      refreshToken,
      role: UserRole.CONDIDATE,
    });
    return newCondidate.save();
  }
  hashdata(data: string) {
    return argon2.hash(data);
  }
  async getCondidateByID(condidateId: string) {
    return this.condidateModel
      .findById(condidateId)
      .populate('jobApplications')
      .exec();
  }

  async findByEmail(email: string): Promise<ICondidate> {
    const condidate = await this.condidateModel.findOne({
      email,
      role: UserRole.CONDIDATE,
    });
    if (!condidate) {
      throw new BadRequestException(
        `condidate with email : ${email} not found`
      );
    }
    return condidate;
  }
  async updateProfile(
    id: string,
    updateData: UpdateCondidateDto
  ): Promise<ICondidate> {
    if (updateData.password) {
      updateData.password = await argon2.hash(updateData.password);
    }
    const update = await this.condidateModel
      .findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      )
      .lean();
    if (!update) {
      throw new BadRequestException(`condidate with Id ${id} not found`);
    }
    return update;
  }
  async deleteCondidate(id: string): Promise<ICondidate> {
    const condidate = await this.condidateModel.findByIdAndDelete(id);
    if (!condidate) {
      throw new BadRequestException(`condidate with id ${id} not found`);
    }
    return condidate;
  }

  async ListAllCondidates(): Promise<ICondidate[]> {
    const condidates = await this.condidateModel.find({
      role: UserRole.CONDIDATE,
    });
    if (condidates.length === 0) {
      throw new BadRequestException('no condidates found');
    }
    return condidates;
  }

  async searchCondidate(query: any): Promise<ICondidate[]> {
    const { name, skills, email } = query;
    const searchQuery: any = {};
    if (name) {
      searchQuery.name = new RegExp(name, 'i');
    }
    if (skills) {
      searchQuery.skills = { $in: skills.split(',') };
    }
    if (email) {
      searchQuery.email = email;
    }
    return this.condidateModel.find(searchQuery);
  }
  async updateDesiredFields(
    id: string,
    updateDto: UpdateCondidateDto
  ): Promise<ICondidate> {
    const condidate = await this.condidateModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true }
    );
    if (!condidate) {
      throw new BadRequestException(`condidate with id ${id} not found`);
    }
    return condidate;
  }
  async incrementViewCount(id: string): Promise<ICondidate> {
    const condidate = await this.condidateModel.findById(id);
    if (!condidate) {
      throw new BadRequestException(`condidate with id ${id} not found`);
    }
    return this.condidateModel.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
  }
  async findMostViwed(): Promise<ICondidate | null> {
    return this.condidateModel.findOne().sort({ viewCount: -1 }).exec();
  }
}
