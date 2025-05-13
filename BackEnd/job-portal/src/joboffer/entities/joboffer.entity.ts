import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class JobOffer extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  requirements: string;
  @Prop()
  location?: string;
  @Prop({ type: [String], required: true })
  requiredSkills: string[];
  @Prop({ required: true })
  salary: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'company', required: true })
  company: Types.ObjectId;
  @Prop([{ type: SchemaTypes.ObjectId, ref: 'JobApplication', default: [] }])
  jobApplications: Types.ObjectId[];
  @Prop([
    { type: SchemaTypes.ObjectId, ref: 'TestJobApplication', default: [] },
  ])
  testJobApplication: Types.ObjectId[];
  @Prop({ enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status: string;
  @Prop({ default: 0 })
  viewCount?: number;
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const JobOfferSchema = SchemaFactory.createForClass(JobOffer);
