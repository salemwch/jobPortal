import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from 'src/user/user.module';
import { JobOfferModule } from 'src/joboffer/joboffer.module';
import { JobApplicationModule } from 'src/jobapplication/jobapplication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { TestJobApplicationModule } from 'src/testjobapplication/testjobapplication.module';
import { adminSchema } from './entities/admin.entity';
import { CondidatesModule } from 'src/condidates/condidates.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    JobOfferModule,
    forwardRef(() => JobApplicationModule),
    TestJobApplicationModule,
    UserModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [MongooseModule],
})
export class AdminModule {}
