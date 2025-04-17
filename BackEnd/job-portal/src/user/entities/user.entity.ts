import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { UserRole } from 'src/userRole/userRole';

export type UserDocument = User & Document
@Schema({discriminatorKey:"role",collection:"users"})
export class User
{
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  refreshToken: string;
  @Prop()
  phone: number;
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
