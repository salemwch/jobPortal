import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { UserRole } from '../../userRole/userRole';

@Schema()
export class Condidate extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  phone: number;
  @Prop()
  education?: string;
  @Prop()
  workExperience?: string;
  @Prop()
  skills?: string[];
  @Prop()
  location?: string;
  @Prop()
  resumeLink?: string;
  @Prop()
  image?: string;
  @Prop({ enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status: string;
  @Prop([{ type: SchemaTypes.ObjectId, ref: 'JobApplication', default: [] }])
  jobApplications: Types.ObjectId[];
  @Prop([
    { type: SchemaTypes.ObjectId, ref: 'TestJobApplication', default: [] },
  ])
  testJobApplication: Types.ObjectId[];
  @Prop([{ type: String }])
  desiredSkills: string[];
  @Prop([{ type: String }])
  desiredJobTypes: string[];
  @Prop({ default: 0 })
  viewCount: number;
  @Prop({ default: Date.now })
  createdAt: Date;
  readonly role: UserRole;
}
export const CondidateSchema = SchemaFactory.createForClass(Condidate);
