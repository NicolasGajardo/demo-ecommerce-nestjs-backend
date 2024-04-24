import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get('health')
  @HttpCode(HttpStatus.OK)
  health() {
    return 'ok';
  }
}
