import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsNumber()
  @IsNotEmpty()
  salary: number;
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  requiredSkills: string[];
}
