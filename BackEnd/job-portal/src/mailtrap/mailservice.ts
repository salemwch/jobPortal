import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JobApplicationService } from 'src/jobapplication/jobapplication.service';
import { JobOfferService } from 'src/joboffer/joboffer.service';
import { ICompany, PopulatedJobOffer } from 'src/company/Interface/Interface';
import { IJobOffer } from 'src/joboffer/interface/InterfaceJobOffer';
import mongoose from 'mongoose';
import { JobOffer } from 'src/joboffer/entities/joboffer.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService,
    @Inject(forwardRef(() => JobApplicationService))
    private readonly jobOfferModel : JobOfferService
  ) {}
  async sendContactEmail(name: string, email: string, subject: string, message: string) {
    await this.mailerService.sendMail({
      to: 'salemwachwacha1997@gmail.com', 
      from: '"Contact Form" <noreply@yourdomain.com>',
      subject: subject,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<b>From:</b> ${name} &lt;${email}&gt;<br><p>${message}</p>`,
    });
    return { message: 'Email sent successfully' };
  }
  async sendJobApplicationEmail(applicationData: {
    name: string;
    location: string;
    experience?: string;
    motivationLetter?: string;
    cvUrl: string;
    jobOffer: PopulatedJobOffer;  
    to: string;
  }) {
    const { name, location, experience, motivationLetter, jobOffer, cvUrl, to } = applicationData;
  
    const jobTitle = jobOffer.title;
    const jobDescription = jobOffer.description;  
    const companyName = applicationData.jobOffer.company?.name ?? 'Not Provided';  
  
    // Send the email
    await this.mailerService.sendMail({
      to: to, 
      from: '"Job Application" <noreply@yourdomain.com>',
      subject: `New Job Application for ${jobTitle}`,
      text: `
        Name: ${name}
        Location: ${location}
        Experience: ${experience ?? 'N/A'}
        CV URL: ${cvUrl}
        Motivation Letter: ${motivationLetter ?? 'Not provided'}
        Job Title: ${jobTitle}
        Company: ${companyName ?? 'Not Provided'}
      `,
      html: `
        <h2>New Job Application</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>Experience:</b> ${experience ?? 'N/A'}</p>
        <p><b>Job Title:</b> ${jobTitle}</p>
        <p><b>Company:</b> ${companyName ?? 'Not Provided'}</p>
        <p><b>Motivation Letter:</b> ${motivationLetter ?? 'Not provided'}</p>
        <p><b>CV:</b> <a href="${cvUrl}">${cvUrl}</a></p>
      `,
    });
  
    return { message: 'Job application email sent successfully' };
  }
  
  
  
  
  
}
