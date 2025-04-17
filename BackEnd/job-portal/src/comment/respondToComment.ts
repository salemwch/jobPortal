import { IsDateString, isNotEmpty, IsNotEmpty,  IsOptional,  isString,  IsString } from "class-validator";

export class RespondToCommentDto{
    @IsString()
    @IsNotEmpty()
    response: string;
    @IsString()
    @IsNotEmpty()
    responder: string;
    @IsNotEmpty()
    @IsString()
    userId: string;
    @IsNotEmpty()
    @IsString()
    role: 'company' | 'condidate';
}

