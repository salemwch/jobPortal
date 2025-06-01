import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { UserRole } from '../../userRole/userRole';

@Schema()
export class Admin extends User {
  @Prop()
  image: string;
  readonly role: UserRole;
}
export const adminSchema = SchemaFactory.createForClass(Admin);
