import { isMongoId, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content: string;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsMongoId()
    company?: string;
    @IsString()
    @IsMongoId()
    condidate: string;
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    jobOffer: string;
    
}
