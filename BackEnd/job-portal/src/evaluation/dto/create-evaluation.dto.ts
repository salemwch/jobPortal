import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateEvaluationDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;
    @IsOptional()
    @IsString()
    review?: string;
}
