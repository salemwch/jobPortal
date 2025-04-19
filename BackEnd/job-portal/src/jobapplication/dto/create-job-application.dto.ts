import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApplicationStatus } from '../enumApplication';

export class CreateJobApplicationDto {
  @IsMongoId()
  @IsNotEmpty()
  condidate: string;
  @IsMongoId()
  @IsNotEmpty()
  jobOffer: string;
  @IsMongoId()
  @IsNotEmpty()
  testJobApplication: string;
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus = ApplicationStatus.Pending;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  location: string;
  @IsString()
  @IsOptional()
  experience?: string;
  @IsString()
  @IsOptional()
  motivationLetter?: string;
  @IsOptional()
  cvUrl: any;
  to: string;
}
