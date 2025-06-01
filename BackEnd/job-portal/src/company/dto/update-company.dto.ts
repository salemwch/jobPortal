import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  name?: string;
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  email?: string;
  @IsOptional()
  @IsString()
  password?: string;
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
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
  speciality?: string[];

  @IsOptional()
  description: string;
  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  phone?: number;
}
