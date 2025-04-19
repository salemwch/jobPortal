import { Document } from 'mongoose';
import { IJobOffer } from 'src/joboffer/interface/InterfaceJobOffer';
import { UserRole } from 'src/userRole/userRole';

export interface ICompany extends Document {
  name: string;
  email: string;
  password: string;
  speciality: string[];
  phone: number;
  website: string;
  location: string;
  image?: string;
  role: UserRole;
  status: string;
  createdAt: Date;
  viewCount: number;
}
export interface PopulatedJobOffer extends Omit<IJobOffer, 'company'> {
  company: ICompany;
}
