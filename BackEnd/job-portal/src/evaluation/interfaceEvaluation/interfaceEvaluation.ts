import { Interface } from 'readline';

export interface IEvaluation {
  condidateId: string;
  companyId: string;
  rating: number;
  review?: string;
  createdAt: Date;
}
