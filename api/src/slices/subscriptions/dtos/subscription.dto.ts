import { ISubscriptionData } from '../domain';
import { ApiProperty } from '@nestjs/swagger';
export class SubscriptionDto implements ISubscriptionData {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
