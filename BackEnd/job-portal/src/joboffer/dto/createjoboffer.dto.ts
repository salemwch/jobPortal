import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobOfferDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsMongoId()
  @IsNotEmpty()
  company: string;
  @IsString()
  @IsOptional()
  location: string;
  @IsString()
  @IsNotEmpty()
  requirements: string;
  @IsString()
  @IsNotEmpty()
  salary: string;
  @IsString()
  requiredSkills: string[];
}
