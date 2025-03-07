import { Module } from '@nestjs/common';
import { MailsController } from './mails.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [MailsController],
})
export class MailsModule {}
