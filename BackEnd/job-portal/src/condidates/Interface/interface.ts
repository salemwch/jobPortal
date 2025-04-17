import { IsEnum } from "class-validator";
import { Document, Types } from "mongoose";
import { User } from "src/user/entities/user.entity";
import { IUser } from "src/user/Interface/IUser";
import { UserRole } from "src/userRole/userRole";

export interface ICondidate extends Document{
    name: string;
    email: string;
    password: string;
    phone: number;
    education?: string;
    workExperience?: string;
    skills?: string;
    resumeLink?: string;
    image?: string;
    role: UserRole;
    desiredJobTypes?: string[];
    desiredSkills?: string[];
    location?: string;
    viewCount: number;
    status: string;
    createdAt: Date;
}