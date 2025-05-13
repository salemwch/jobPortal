import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;
  @IsMongoId()
  @IsNotEmpty()
  user: string;
  @IsOptional()
  @IsString()
  type?: string;
  @IsMongoId()
  @IsNotEmpty()
  jobOffer: string;
}
