import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { UserModule } from '../user/user.module';
import { TestJobApplicationModule } from 'src/testjobapplication/testjobapplication.module';
import { JobOfferModule } from 'src/joboffer/joboffer.module';
import { MailModule } from 'src/mailtrap/mailmodule';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/entities/user.entity';
import { CopmanySchema } from './entities/company.entity';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => TestJobApplicationModule),
    forwardRef(() => MailModule),
    forwardRef(() => JobOfferModule),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
