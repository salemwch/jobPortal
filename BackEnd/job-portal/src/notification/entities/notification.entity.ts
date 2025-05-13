import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
  @Prop({ required: true })
  message: string;
  @Prop({ default: false })
  read: boolean;
  @Prop({ default: 'info' })
  type: string;

  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'JobOffer', required: true })
  jobOffer: Types.ObjectId;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
