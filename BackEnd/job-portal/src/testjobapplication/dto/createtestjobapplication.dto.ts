import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Types } from "mongoose";

export class CreateTestJobApplicationDto{
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    description: string;
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => Object)
    questions: {
    _id?: Types.ObjectId; 
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
    @IsArray()
    @IsOptional()
    @IsMongoId({ each: true })
    jobApplication?: string[];
    @IsMongoId()
    @IsNotEmpty()
    jobOffer: string;
    @IsOptional()
    score?: number;
    @IsMongoId()
    @IsNotEmpty()
    @IsOptional()
    condidate?: string;
}