import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { types } from 'util';

@Schema()
export class TestJobApplication extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, auto: true },
        question: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
      },
    ],
  })
  questions: {
    _id: Types.ObjectId;
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: null })
  updatedAt?: Date;
  @Prop([{ type: SchemaTypes.ObjectId, ref: 'condidate' }])
  condidate: Types.ObjectId[];
  @Prop({ type: SchemaTypes.ObjectId, ref: 'JobOffer', required: true })
  jobOffer: Types.ObjectId;
  @Prop()
  score: number;
}

export const JobTestSchema = SchemaFactory.createForClass(TestJobApplication);
