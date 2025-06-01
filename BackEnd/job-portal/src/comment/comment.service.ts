import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from './entities/comment.entity';
import { ModerateCommentDto } from './moderatecommentDto';
import { IJobOffer } from 'src/joboffer/interface/InterfaceJobOffer';
import { NotificationGateway } from 'src/notification/notification.getway';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('comment') private readonly commentModel: Model<Comment>,
    @InjectModel('JobOffer') private readonly jobOfferModel: Model<IJobOffer>,
    private readonly notificationGateway: NotificationGateway
  ) {}
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = new this.commentModel(createCommentDto);
    const savedComment = await newComment.save();
    this.notificationGateway.server.emit('commentAdded', {
      jobOfferId: savedComment.jobOffer.toString(),
      comment: savedComment,
    });
    return savedComment;
  }
  async findAll(companyId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ company: companyId })
      .populate('condidate', 'name')
      .populate('company', 'name')
      .exec();
  }
  async findByJobOffer(jobOfferId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ jobOffer: jobOfferId })
      .populate('condidate', 'name')
      .populate('company', 'name')
      .exec();
  }
  async respondToComment(
    commentId: string,
    userId: Types.ObjectId,
    response: string,
    responder: string,
    role: 'company' | 'condidate'
  ): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId).exec();
    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    if (role === 'company') {
      const jobOffer = await this.jobOfferModel
        .findOne({
          _id: comment.jobOffer,
          company: userId,
        })
        .exec();

      if (!jobOffer) {
        throw new ForbiddenException('You do not own this job offer');
      }

      comment.company = userId;
      comment.companyResponse = {
        message: response,
        responder,
      };
    } else if (role === 'condidate') {
      comment.condidate = userId;

      if (!comment.condidateResponse) {
        comment.condidateResponse = [];
      }

      comment.condidateResponse.push({
        message: response,
        responder,
      });
    }
    const updatedComment = await comment.save();
    this.notificationGateway.server.emit('commentReplied', {
      jobOfferId: updatedComment.jobOffer.toString(),
      comment: updatedComment,
    });
    return updatedComment;
  }

  async moderateComment(
    commentId: string,
    moderatDto: ModerateCommentDto
  ): Promise<Comment> {
    const updatedComment = await this.commentModel
      .findByIdAndUpdate(
        commentId,
        { status: moderatDto.status },
        { new: true }
      )
      .exec();
    if (!updatedComment) {
      throw new NotFoundException('comment not found');
    }
    return updatedComment;
  }
  async delete(commentId: string): Promise<void> {
    await this.commentModel.findByIdAndDelete(commentId);
  }
  async GetAllComments(): Promise<Comment[]> {
    const getallComments = await this.commentModel
      .find()
      .populate('condidate', 'name');
    return getallComments;
  }
  async getRecentComments(limit: number): Promise<Comment[]> {
    return this.commentModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('condidate', 'name')
      .populate('company', 'name')
      .select(
        'content condidate company jobOffer status createdAt updatedAt companyResponse condidateResponse'
      )
      .exec();
  }
}
