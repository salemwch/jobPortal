import { forwardRef, Module } from '@nestjs/common';
import { MailService } from './mailservice';
import { MailController } from './mailcontroller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';
import { JobOfferSchema } from 'src/joboffer/entities/joboffer.entity';
import { JobOfferService } from 'src/joboffer/joboffer.service';
import { JobApplicationModule } from 'src/jobapplication/jobapplication.module';
import { JobOfferModule } from 'src/joboffer/joboffer.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports:[
    MailerModule.forRoot({
      transport:{
        host:"sandbox.smtp.mailtrap.io",
        port:2525,
        auth:{
          user:'5d5b17e53ff5a5',
          pass: '83a19f07341924'
        }
      },
      defaults: {
        from: '"Jobgate Mailer" <salemwachwacha1997@gmail.com>',
      },
    }),
    MongooseModule.forFeature([{name: 'jobOffer', schema: JobOfferSchema}]),
    forwardRef(() => JobApplicationModule), forwardRef(() => JobOfferModule), forwardRef(() => CompanyModule)
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
