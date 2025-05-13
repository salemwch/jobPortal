import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UserRole } from '../../userRole/userRole';
import { Type } from 'class-transformer';

export class CreateCondidateDto extends CreateUserDto {
  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'Invalid role' })
  readonly role: UserRole;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  phone: number;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  education?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  workExperience?: string;
  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  skills?: string[];
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  location?: string;
  @IsString()
  @IsOptional()
  resumeUrl?: string;
  @IsString()
  @IsOptional()
  image?: string;
}
