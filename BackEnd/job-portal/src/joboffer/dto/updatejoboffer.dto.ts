import { PartialType } from '@nestjs/mapped-types';
import { CreateJobOfferDto } from './createjoboffer.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  @IsOptional()
  salary?: string;
  @IsString()
  @IsOptional()
  status?: string;
}
