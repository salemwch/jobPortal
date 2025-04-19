import { IUser } from 'src/user/Interface/IUser';
import { UserRole } from 'src/userRole/userRole';

export interface interfaceAdmin extends IUser {
  image: string;
  role: UserRole;
}
