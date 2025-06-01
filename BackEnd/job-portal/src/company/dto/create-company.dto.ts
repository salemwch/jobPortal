import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UserRole } from '../../userRole/userRole';

export class CreateCompanyDto extends CreateUserDto {
  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'Invalid role' })
  readonly role: UserRole;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
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
  speciality?: string[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  website?: string;
  @IsString()
  @IsNotEmpty()
  location: string;
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  phone: number;
  @IsString()
  @IsOptional()
  image?: string;
}
