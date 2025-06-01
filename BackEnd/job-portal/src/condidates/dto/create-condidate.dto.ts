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
import { Transform, Type } from 'class-transformer';

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
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return value;
  })
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
  @IsString()
  @IsOptional()
  description: string;
}
