import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { adminSchema } from '../admin/entities/admin.entity';
import { CondidateSchema } from '../condidates/entities/condidate.entity';
import { CopmanySchema } from '../company/entities/company.entity';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'user',
        schema: UserSchema,
        discriminators: [
          { name: 'admin', schema: adminSchema },
          { name: 'condidate', schema: CondidateSchema },
          { name: 'company', schema: CopmanySchema },
        ],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
