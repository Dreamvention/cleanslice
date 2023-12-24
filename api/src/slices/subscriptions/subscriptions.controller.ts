import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ISubscriptionsGateway } from './domain/gateways';
import { ISubscriptionData } from './domain/entities';
import { CreateSubscriptionDto, UpdateSubscriptionDto, SubscriptionDto } from './dtos';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard, IRequestWithAuth } from 'src/slices/users';

@UseGuards(AuthGuard)
@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsGateway: ISubscriptionsGateway) {}

  @ApiOperation({ description: 'List all subscriptions', operationId: 'getSubscriptions' })
  @ApiOkResponse({ type: [SubscriptionDto] })
  @Get()
  async getSubscriptions(): Promise<ISubscriptionData[]> {
    return await this.subscriptionsGateway.getSubscriptions();
  }

  @ApiOperation({ description: 'Get a subscription', operationId: 'getSubscription' })
  @ApiOkResponse({ type: SubscriptionDto })
  @Get(':id')
  async getSubscription(@Param('id') id: string): Promise<ISubscriptionData> {
    return await this.subscriptionsGateway.getSubscription(parseInt(id));
  }

  @ApiOperation({ description: 'Create a new subscription', operationId: 'createSubscription' })
  @ApiBody({ type: CreateSubscriptionDto })
  @Post()
  async createSubscription(@Body() data: CreateSubscriptionDto): Promise<ISubscriptionData> {
    return await this.subscriptionsGateway.createSubscription(data);
  }

  @ApiOperation({ description: 'Update a subscription', operationId: 'updateSubscription' })
  @ApiBody({ type: UpdateSubscriptionDto })
  @Put(':id')
  async updateSubscription(@Param('id') id: string, @Body() data: UpdateSubscriptionDto): Promise<ISubscriptionData> {
    return await this.subscriptionsGateway.updateSubscription(parseInt(id), data);
  }

  @ApiOperation({ description: 'Delete a subscription', operationId: 'deleteSubscription' })
  @Delete(':id')
  async deleteSubscription(@Param('id') id: string): Promise<boolean> {
    return await this.subscriptionsGateway.deleteSubscription(parseInt(id));
  }

  @ApiOperation({ description: 'Returns currently logged in subscription', operationId: 'getLoggedInSubscription' })
  @ApiOkResponse({ type: SubscriptionDto })
  @ApiBearerAuth('access-token')
  @Get('/me')
  async getLoggedInSubscription(@Req() request: IRequestWithAuth): Promise<ISubscriptionData> {
    console.log(request);
    return await this.subscriptionsGateway.getSubscription(request.subscription?.id);
  }
}
