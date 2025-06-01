import { Document, PopulatedDoc } from 'mongoose';
import { ICompany } from 'src/company/Interface/Interface';
export interface IJobOffer extends Document {
  title: string;
  description: string;
  company: PopulatedDoc<ICompany>;
  location?: string;
  requirement: string[];
  salary: number;
  viewCount?: number;
  status: string;
  requiredSkills: string[];
}
