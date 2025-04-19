import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'JobOffer', required: true })
  jobOffer: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'company', required: false })
  company?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'condidate', required: false })
  condidate?: Types.ObjectId;

  @Prop({
    type: {
      message: { type: String },
      responder: { type: String },
    },
    default: null,
  })
  companyResponse?: {
    message: string;
    responder: string;
  };

  @Prop({
    type: [
      {
        message: { type: String },
        responder: { type: String },
      },
    ],
    default: [],
  })
  condidateResponse?: {
    message: string;
    responder: string;
  }[];

  @Prop({
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: string;
}

export const commentSchema = SchemaFactory.createForClass(Comment);
