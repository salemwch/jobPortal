import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value
          .split(',')
          .map(s => s.trim())
          .filter(s => s);
      }
    }
    return value;
  })
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
  @IsNotEmpty()
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
