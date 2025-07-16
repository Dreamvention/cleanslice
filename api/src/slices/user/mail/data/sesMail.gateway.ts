// @scope:api
// @slice:user/mail
// @layer:data
// @type:gateway

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESClient, SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';
import { IMailGateway } from '../domain/mail.gateway';
import { ICreateMailData } from '../domain/mail.types';

@Injectable()
export class SesMailGateway implements IMailGateway {
  private sesClient: SESClient;
  private readonly fromEmail: string;

  constructor(private configService: ConfigService) {
    this.fromEmail = this.configService.get<string>('SES_FROM');

    if (!this.fromEmail) {
      throw new Error('SES_FROM environment variable is required');
    }

    this.sesClient = new SESClient({
      region: this.configService.get<string>('AWS_REGION') || 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async sendMail(data: ICreateMailData): Promise<boolean> {
    try {
      const params: SendEmailCommandInput = {
        Source: this.fromEmail,
        Destination: {
          ToAddresses: [data.recipientEmail],
        },
        Message: {
          Subject: {
            Data: data.subject,
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: data.content || '',
              Charset: 'UTF-8',
            },
          },
        },
      };

      const command = new SendEmailCommand(params);
      await this.sesClient.send(command);

      console.log('Email sent successfully via SES');
      return true;
    } catch (error) {
      console.error('Error sending email via SES:', error);
      return false;
    }
  }
}
