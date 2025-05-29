import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { IMailGateway } from '../domain/mail.gateway';
import { ICreateMailData } from '../domain/mail.types';

@Injectable()
export class MailGateway implements IMailGateway {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const port = this.configService.get<number>('SMTP_PORT');
    const secure = this.configService.get('SMTP_SECURE') === 'true';

    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port,
      secure, // true for 465, false for other ports
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
        // Use modern TLS
        minVersion: 'TLSv1.2',
      },
    });

    // Verify connection configuration
    this.transporter.verify(function (error, success) {
      if (error) {
        console.error('SMTP Connection Error:', error);
      } else {
        console.log('SMTP Server is ready to take our messages');
      }
    });
  }

  async sendMail(data: ICreateMailData): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: {
          name: 'Your App Name',
          address: data.senderEmail,
        },
        to: data.recipientEmail,
        subject: data.subject,
      });
      return true;
    } catch (error) {
      console.error('Error sending email', error);
      return false;
    }
  }
}
