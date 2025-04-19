import { Types } from 'mongoose';

export interface IJobApplication {
  condidate: string;
  jobOffer: string;
  status?: string;
  testResults?: {
    questionId: string;
    answer: string | null;
    isCorrect: boolean | null;
  }[];
  createdAt: Date;
  updatedAt?: string;
  score: number;
  testJobApplication: Types.ObjectId;
}
