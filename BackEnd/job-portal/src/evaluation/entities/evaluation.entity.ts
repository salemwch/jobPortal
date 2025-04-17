import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Evaluation {
    @Prop({type: String, required: true})
    condidateId: string;
    @Prop({type: String, required: true})
    companyId: string;
    @Prop({type: String, required: true, min: 1, max: 5})
    rating: number;
    @Prop({type: String, required: false})
    review: string;
    @Prop({type: String, default: Date.now})
    createdAt: Date;
}
export const EvaluationSchema = SchemaFactory.createForClass(Evaluation);