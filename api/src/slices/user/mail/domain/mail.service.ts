import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IMailGateway } from './mail.gateway';
import { ICreateMailData } from './mail.types';

@Injectable()
export class MailService {
  constructor(
    private configService: ConfigService,
    private mailGateway: IMailGateway,
  ) {}

  async sendConfirmationEmail(email: string, token: string): Promise<void> {
    console.log('Sending confirmation email to', email);
    try {
      const frontendUrl = this.configService.get('FRONTEND_URL');
      const confirmationUrl = `${frontendUrl}/auth/confirm?token=${token}&email=${email}`;
      const fromEmail = this.configService.get('SMTP_FROM');

      if (!fromEmail) {
        throw new Error('SMTP_FROM environment variable is not set');
      }

      const mailData: ICreateMailData = {
        senderEmail: fromEmail,
        recipientEmail: email,
        subject: 'Confirm your email address',
        content: `
        <h1>Welcome!</h1>
        <p>Please confirm your email address by clicking the link below:</p>
        <a href="${confirmationUrl}">Confirm Email Address</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, you can safely ignore this email.</p>
      `,
      };

      const success = await this.mailGateway.sendMail(mailData);
      if (!success) {
        throw new Error('Failed to send confirmation email');
      }

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email', error);
      throw error; // Re-throw to handle it in the calling code
    }
  }
}
