import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { commentSchema } from './entities/comment.entity';
import { JobOfferModule } from 'src/joboffer/joboffer.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'comment', schema: commentSchema }]),
    JobOfferModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
