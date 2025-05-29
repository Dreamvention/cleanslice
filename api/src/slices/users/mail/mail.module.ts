import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { UsersModule } from '../users/users.module';
import { MailService } from './domain/mail.service';
import { MailGateway } from './data/mail.gateway';
import { IMailGateway } from './domain/mail.gateway';

@Module({
  imports: [UsersModule],
  controllers: [MailController],
  providers: [
    MailService,
    {
      provide: IMailGateway,
      useClass: MailGateway,
    },
  ],
  exports: [MailService],
})
export class MailModule {}
