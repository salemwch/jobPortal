import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { UserRole } from '../../userRole/userRole';

@Schema()
export class Admin extends User {
  @Prop()
  image: string;
  @IsEnum(UserRole, { message: 'invalid role' })
  role: UserRole;
}
export const adminSchema = SchemaFactory.createForClass(Admin);
