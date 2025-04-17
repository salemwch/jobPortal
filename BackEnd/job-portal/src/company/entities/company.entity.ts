import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum } from "class-validator";
import { Document, SchemaTypes, Types } from "mongoose";
import { User } from "src/user/entities/user.entity";
import { UserRole } from "src/userRole/userRole";


@Schema()
export class Company extends Document{
    readonly role: UserRole;
    @Prop({required: true})
    name: string;
    @Prop({required:true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop([String])
    speciality: string[];
    @Prop({required:true})
    website: string;
    @Prop({required:true})
    location: string;
    @Prop({required:true})
    phone: number;
    @Prop()
    image?: string;
    @Prop({default: Date.now})
    createdAt: Date;
    @Prop({enum: ['pending', 'approved', 'rejected'], default: 'pending'})
    status: string;
    @Prop([{ type: SchemaTypes.ObjectId, ref: 'JobOffer' }]) 
    jobOffers: Types.ObjectId[];
    @Prop({default: 0})
    viewCount: number;
    
}
export const CopmanySchema = SchemaFactory.createForClass(Company);
