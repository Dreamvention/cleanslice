import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '#users/auth';

@Public()
@ApiTags('health')
@Controller('health')
export class HealthController {
  @ApiOperation({ description: 'Get Health status', operationId: 'getHealth' })
  @Get()
  check() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
