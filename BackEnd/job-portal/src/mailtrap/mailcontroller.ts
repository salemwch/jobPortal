import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mailservice';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async send(@Body() body: { name: string; email: string; subject: string; message: string }) {
    return this.mailService.sendContactEmail(
      body.name,
      body.email,
      body.subject,
      body.message
    );
  }
}
