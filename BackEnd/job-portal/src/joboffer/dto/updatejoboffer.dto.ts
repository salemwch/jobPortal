import { PartialType } from '@nestjs/mapped-types';
import { CreateJobOfferDto } from './createjoboffer.dto';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateJobOfferDto extends PartialType(CreateJobOfferDto) {
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsOptional()
  location?: string;
  @IsString()
  @IsOptional()
  requirements?: string;
  @IsNumber()
  @IsOptional()
  salary?: number;
  @IsString()
  @IsOptional()
  status?: string;
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requiredSkills?: string[];
}
