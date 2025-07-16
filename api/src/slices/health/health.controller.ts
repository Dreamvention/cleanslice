import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../user/auth/public.decorator';
import { ApiSuccessResponse } from '#core';

@Controller('health')
@ApiTags('health')
export class HealthController {
  @ApiOperation({ description: 'Check health', operationId: 'checkHealth' })
  @ApiSuccessResponse()
  @Public()
  @Get()
  check() {
    return { status: 'ok' };
  }
}
