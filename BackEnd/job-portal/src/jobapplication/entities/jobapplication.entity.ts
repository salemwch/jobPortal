import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ApplicationStatus } from '../enumApplication';

@Schema({ timestamps: true })
export class JobApplication extends Document {
  @Prop({
    type: [
      {
        questionId: { type: String, required: true },
        answer: { type: String, default: null },
        isCorrect: { type: Boolean, default: null },
      },
    ],
    default: [],
  })
  testResults?: {
    questionId: string;
    answer?: string | null;
    isCorrect?: boolean | null;
  }[];
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: false })
  condidate?: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'JobOffer', required: true })
  jobOffer: Types.ObjectId;
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'TestJobApplication',
    required: false,
  })
  testJobApplication?: Types.ObjectId;
  @Prop({ default: 0 })
  score: number;
  @Prop({
    type: String,
    enum: ApplicationStatus,
    default: ApplicationStatus.Pending,
  })
  status?: ApplicationStatus;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  location: string;
  @Prop({ required: false })
  experience: string;
  @Prop({ required: false })
  motivationLetter: string;
  @Prop({ required: false })
  cvUrl: string;
}
export const JobApplicationSchema =
  SchemaFactory.createForClass(JobApplication);
