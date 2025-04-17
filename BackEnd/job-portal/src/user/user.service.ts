import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { IUser } from './Interface/IUser';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from "argon2";
import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private userModel: Model<IUser>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<IUser>{
    const user = new this.userModel(createUserDto);
    await user.save()
    return user;
  }
  async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email:email });
  }
  async findById(email: string): Promise<IUser> {
    return this.userModel.findById(email);
  }
  async update(id: string, updateduserdto: UpdateUserDto): Promise<IUser>{
    if(updateduserdto.password){
      updateduserdto.password = await argon2.hash(updateduserdto.password);
    }
    return this.userModel.findByIdAndUpdate(id,updateduserdto, {new: true});
  }
  async updatetoken(id: any,  token: string):Promise<IUser> {
    return this.userModel.findByIdAndUpdate(id, {token}, { new: true });
  }
  async deleteAccount(id: string): Promise<IUser>{
    return this.userModel.findByIdAndDelete(id);
  }
  async getAllUsers(): Promise<any[]>{
    return this.userModel.find().populate({
      path: 'jobOffers',
      model: 'JobOffer'
    }).exec();
  }
  async getRecentUsers(limit: number) {
    return this.userModel
      .find({}, { name: 1, email: 1, status: 1, createdAt: 1 }) 
      .sort({ createdAt: -1 }) 
      .limit(limit);
  }
}
