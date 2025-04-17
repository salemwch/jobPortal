import { IsEmail, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { UserRole } from '../../userRole/userRole';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNumber()
    @IsNotEmpty()
    @Type(()=>
    Number
    )
    phone: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'password at least be 6 charachters' })
  @Matches(/(?=.*[A-Z])/)
  @Matches(/(?=.*\d)/)
  password: string;
  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'Invalid role' })
  readonly role: UserRole;
  refreshToken: string;
  @IsOptional()
  @IsString()
  image?: string;
  
}
