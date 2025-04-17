import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ICompany } from "src/company/Interface/Interface";

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    message: string;
    @IsMongoId()
    @IsNotEmpty()
    user: string | ICompany;
    @IsOptional()
    @IsString()
    type?: string;
}
