import { Type } from 'class-transformer';
import {
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
  @MinLength(6, { message: 'password must be at least 6 charachters long.' })
  password: string;
  @IsString()
  @IsNotEmpty()
  speciality: string[];
  @IsString()
  @IsNotEmpty()
  website: string;
  @IsString()
  @IsNotEmpty()
  location: string;
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  phone: number;
  @IsString()
  image?: string;
}
