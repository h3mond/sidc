import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AccountEntityProps } from '../../core/domain/entities/account.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailConfirmation(account: AccountEntityProps, code: string) {
    await this.mailerService.sendMail({
      to: account.email,
      subject: 'Welcome to SafeID Console! Confirm your Email',
      text: `Code is ${code}`,
      html: `<h1>Code is ${code}</h1>`,
    });
  }
}
