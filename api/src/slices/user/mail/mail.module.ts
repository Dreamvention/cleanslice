import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { UserModule } from '../user/user.module';
import { MailService } from './domain/mail.service';
import { SmtpMailGateway } from './data/smptMail.gateway';
import { SesMailGateway } from './data/sesMail.gateway';
import { IMailGateway } from './domain/mail.gateway';

@Module({
  imports: [UserModule],
  controllers: [MailController],
  providers: [
    MailService,
    {
      provide: IMailGateway,
      useClass: process.env.MAIL_TYPE === 'smtp' ? SmtpMailGateway : SesMailGateway,
    },
  ],
  exports: [MailService],
})
export class MailModule {}
