import { Document, Types } from 'mongoose';
import { UserRole } from 'src/userRole/userRole';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: { type: Number; required: true };
  refreshToken: { type: string };
  role: UserRole;
  verificationToken: string;
  verified: boolean;
}
