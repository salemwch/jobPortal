import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRole } from 'src/userRole/userRole';

export class CreateAdminDto extends CreateUserDto {
  @IsOptional()
  @IsString()
  image: string;
  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'invadlid role specified' })
  readonly role: UserRole = UserRole.ADMIN;
}
