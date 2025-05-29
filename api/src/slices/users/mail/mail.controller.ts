import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SNS } from '@aws-sdk/client-sns';
import { UsersService } from '#users/users';

@Controller('mail')
@ApiTags('mail')
export class MailController {
  constructor(private readonly usersService: UsersService) {}

  @Post('bounces')
  public async handleMailBounces(@Body() content: any, @Request() req: Request) {
    const sns = new SNS();
    let body = content.toString();
    body = JSON.parse(body);
    if (req.headers['x-amz-sns-message-type'] === 'Notification' && body.Message) {
      await this.handleMailNotification(body);
    } else if (req.headers['x-amz-sns-message-type'] === 'SubscriptionConfirmation') {
      console.log('handleBounces', JSON.stringify(body));
      const params = {
        Token: body.Token,
        TopicArn: process.env.SNS_TOPIC_ARN_BOUNCE,
      };
      const data = await sns.confirmSubscription(params);
      console.error(data);
      console.log('handleDelivery', JSON.stringify(params));
    }
  }

  @Post('complaints')
  public async handleMailComplaints(@Body() content: any, @Request() req: Request) {
    const sns = new SNS();
    let body = content.toString();
    body = JSON.parse(body);
    if (req.headers['x-amz-sns-message-type'] === 'Notification' && body.Message) {
      await this.handleMailNotification(body);
    } else if (req.headers['x-amz-sns-message-type'] === 'SubscriptionConfirmation') {
      console.log('handleComplaints', JSON.stringify(body));
      const params = {
        Token: body.Token,
        TopicArn: process.env.SNS_TOPIC_ARN_COMPLAINT,
      };
      const data = await sns.confirmSubscription(params);
      console.error(data);
      console.log('handleComplaints', JSON.stringify(params));
    }
  }

  @Post('deliveries')
  public async handleMailDeliveries(@Body() content: any, @Request() req: Request) {
    const sns = new SNS();
    let body = content.toString();
    body = JSON.parse(body);
    if (req.headers['x-amz-sns-message-type'] === 'Notification' && body.Message) {
      await this.handleMailNotification(body);
    } else if (req.headers['x-amz-sns-message-type'] === 'SubscriptionConfirmation') {
      console.log('handleDelivery', JSON.stringify(body));
      const params = {
        Token: body.Token,
        TopicArn: process.env.SNS_TOPIC_ARN_DELIVERY,
      };
      const data = await sns.confirmSubscription(params);
      console.error(data);
      console.log('handleDelivery', JSON.stringify(params));
    }
  }

  public async handleMailNotification(body: any) {
    const message = JSON.parse(body.Message);
    if ((message && message.notificationType == 'Bounce') || message.notificationType == 'Complaint') {
      const mail = message.mail;
      if (mail && mail.destination) {
        for (let i = 0; i < mail.destination.length; i++) {
          const address = mail.destination[i];

          try {
            const user = await this.usersService.getUserByEmail(address);

            if (!user) continue;
            user.emailError = true;
            user.emailErrorDescription = message.notificationType;

            await this.usersService.updateUser(user.id, user);
          } catch (error) {
            console.error(error.message);
          }
        }
      }
    }
  }
}
