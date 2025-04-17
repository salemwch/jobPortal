import { Document, Types } from "mongoose";

export interface IJobTest extends Document{
    title: string;
    description: string;
    jobOffer: Types.ObjectId;
    createdAt: Date;
    updateAt?: Date;
    questions: {
        _id: Types.ObjectId;
        question: string;
        options: string[];
        correctAnswer: string;
    }[];
    condidate?: Types.ObjectId[];
    jobApplication?: Types.ObjectId[];
    score?: number;
}