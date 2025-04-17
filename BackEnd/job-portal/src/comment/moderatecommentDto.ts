import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class ModerateCommentDto{
    @IsString()
    @IsNotEmpty()
    @IsIn(['approved', 'rejected'])
    status: 'approved' | 'rejected'; 
}