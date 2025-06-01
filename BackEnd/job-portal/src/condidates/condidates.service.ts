import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCondidateDto } from './dto/create-condidate.dto';
import { UpdateCondidateDto } from './dto/update-condidate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ICondidate } from './Interface/interface';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { UserRole } from '../userRole/userRole';
import { IUser } from '../user/Interface/IUser';
import { IJobTest } from '../testjobapplication/interface/interfacetest';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class CondidatesService {
  constructor(
    @InjectModel('condidate')
    private readonly condidateModel: Model<ICondidate>,
    @InjectModel(User.name) private readonly userModel: Model<IUser>,
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
    const data = { ...updateData } as any;
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }
    delete data.jobApplications;
    delete data.testJobApplication;
    try {
      const updated = await this.condidateModel
        .findByIdAndUpdate(
          id,
          { $set: data },
          { new: true, runValidators: true }
        )
        .lean();
      if (!updated) {
        throw new BadRequestException(`Condidate with ID ${id} not found`);
      }
      return updated;
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.email) {
        throw new BadRequestException('This email is already in use.');
      }
      throw new BadRequestException('Profile update failed.');
    }
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
    const { name, skills, email, location } = query;
    const searchQuery: any = {};

    let skillTerms: string[] = [];

    if (name) {
      searchQuery.name = new RegExp(name, 'i');
    }

    if (skills) {
      skillTerms = skills
        .split(',')
        .map((term: string) => term.trim().toLowerCase().replace(/\s+/g, ''));
    }

    if (email) {
      searchQuery.email = new RegExp(email, 'i');
    }

    if (location) {
      searchQuery.location = new RegExp(location, 'i');
    }

    const candidates = await this.condidateModel.find();
    return candidates.filter((c: any) => {
      const normalizedSkills = (c.skills || []).map((s: string) =>
        s.toLowerCase().replace(/\s+/g, '')
      );

      return (
        (!skillTerms.length ||
          skillTerms.some(term => normalizedSkills.includes(term))) &&
        (!name || new RegExp(name, 'i').test(c.name)) &&
        (!email || new RegExp(email, 'i').test(c.email)) &&
        (!location || new RegExp(location, 'i').test(c.location))
      );
    });
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
  async incrementViewCount(profileId: string, viewerId: string) {
    const profile = await this.condidateModel.findById(profileId);
    if (!profile) {
      throw new Error('Condidate profile not found');
    }
    // Avoid self-view
    if (profile._id.toString() === viewerId) {
      return profile;
    }
    profile.viewers = profile.viewers || [];
    if (profile.viewers.includes(viewerId)) {
      return profile;
    }
    profile.viewers.push(viewerId);
    profile.viewCount += 1;
    return await profile.save();
  }
  async findMostViwed(): Promise<ICondidate | null> {
    return this.condidateModel.findOne().sort({ viewCount: -1 }).exec();
  }
}
