import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RespondToCommentDto } from './respondToComment';
import { ModerateCommentDto } from './moderatecommentDto';
import { Types } from 'mongoose';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Res() response, @Body() createCommentDto: CreateCommentDto) {
    try {
      const comment = await this.commentService.create(createCommentDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'created comment done ',
        comment,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: (error as Error).message,
      });
    }
  }
  @Get('company/:companyId')
  async findAll(@Param('companyId') companyId: string) {
    return this.commentService.findAll(companyId);
  }
  @Get('jobOffer/:jobOfferId')
  async findAllByJoboffer(@Param('jobOfferId') jobOfferId: string) {
    return this.commentService.findByJobOffer(jobOfferId);
  }

  @Post(':commentId/respond')
  async respondToComment(
    @Param('commentId') commentId: string,
    @Body() respondToCommentDto: RespondToCommentDto
  ) {
    return this.commentService.respondToComment(
      commentId,
      new Types.ObjectId(respondToCommentDto.userId),
      respondToCommentDto.response,
      respondToCommentDto.responder,
      respondToCommentDto.role
    );
  }

  @Patch(':commentId/moderate')
  async moderateComment(
    @Param('commentId') commentId: string,
    @Body() moderatedto: ModerateCommentDto
  ) {
    return this.commentService.moderateComment(commentId, moderatedto);
  }
  @Delete(':commentId')
  async delete(@Param('commentId') commentId: string) {
    await this.commentService.delete(commentId);
    return { message: 'comment Deleted successfully' };
  }

  @Get()
  async getAllComments() {
    return this.commentService.GetAllComments();
  }
  @Get('recent')
  async getRecentComments(@Query('limit') limit: number = 3) {
    return this.commentService.getRecentComments(limit);
  }
}
