import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({timestamps: true})
export class Notification extends Document {
    @Prop({required: true})
    message: string;
    @Prop({type: SchemaTypes.ObjectId, ref: 'user', required: true})
    user: Types.ObjectId;
    @Prop({required: false})
    type?: string;
    @Prop({default: false})
    read: boolean;
}

export const notificationSchema = SchemaFactory.createForClass(Notification);