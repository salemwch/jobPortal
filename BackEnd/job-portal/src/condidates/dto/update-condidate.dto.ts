import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCondidateDto } from './create-condidate.dto';

export class UpdateCondidateDto extends PartialType(CreateCondidateDto) {
  @IsOptional()
  @IsString()
  status?: string;
  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsString()
  workExperience?: string;

  @IsOptional()
  @IsString()
  skills?: string[];

  @IsOptional()
  @IsString()
  resumeLink?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  phone?: number;
  @IsOptional()
  desiredJobTypes?: string[];
  @IsOptional()
  desiredSkills?: string[];
}
