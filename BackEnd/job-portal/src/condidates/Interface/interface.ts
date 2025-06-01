import { Document } from 'mongoose';
import { UserRole } from 'src/userRole/userRole';

export interface ICondidate extends Document {
  name: string;
  email: string;
  password: string;
  phone: number;
  education?: string;
  workExperience?: string;
  skills?: string[];
  resumeLink?: string;
  image?: string;
  role: UserRole;
  desiredJobTypes?: string[];
  desiredSkills?: string[];
  location?: string;
  viewCount: number;
  status: string;
  createdAt: Date;
  viewers: string[];
  description: string;
}
