// @scope:api
// @slice:user/mail
// @layer:data
// @type:gateway

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { IMailGateway } from '../domain/mail.gateway';
import { ICreateMailData } from '../domain/mail.types';

@Injectable()
export class SmtpMailGateway implements IMailGateway {
  private transporter: nodemailer.Transporter;
  private readonly fromEmail: string;

  constructor(private configService: ConfigService) {
    this.fromEmail = this.configService.get<string>('SMTP_FROM');

    if (!this.fromEmail) {
      throw new Error('SMTP_FROM environment variable is required');
    }

    const port = this.configService.get<number>('SMTP_PORT');
    const secure = this.configService.get('SMTP_SECURE') === 'true';
    const host = this.configService.get<string>('SMTP_HOST');
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');

    // Validate required SMTP configuration
    if (!host || !port || !user || !pass) {
      throw new Error('SMTP configuration incomplete. Check SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS');
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
        // Use modern TLS
        minVersion: 'TLSv1.2',
      },
      // Connection pooling for better performance
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      // Rate limiting
      rateLimit: 5, // 5 emails per second
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('SMTP Connection Error:', error);
      } else {
        console.log('SMTP Server is ready to take our messages');
      }
    });
  }

  async sendMail(data: ICreateMailData): Promise<boolean> {
    try {
      const mailOptions = {
        from: {
          name: this.configService.get<string>('SMTP_FROM_NAME') || 'Your App Name',
          address: this.fromEmail,
        },
        to: data.recipientEmail,
        subject: data.subject,
        html: data.content,
        text: this.htmlToText(data.content), // Fallback text version
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  private htmlToText(html: string): string {
    // Simple HTML to text conversion
    return html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>') // Replace &gt; with >
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  }
}
