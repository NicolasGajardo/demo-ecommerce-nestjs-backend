import { Injectable, Logger } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class PrismaHealthIndicatorService extends HealthIndicator {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return this.getStatus(key, true);
    } catch (error) {
      Logger.error(error, `${PrismaHealthIndicator.name}::isHealthy`);

      throw new HealthCheckError(
        'cannot perform DB checks',
        this.getStatus(key, false, {
          message: 'cannot perform DB checks',
        }),
      );
    }
  }
}
