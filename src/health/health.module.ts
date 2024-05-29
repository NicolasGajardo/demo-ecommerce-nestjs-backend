import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaHealthIndicatorService } from './prisma-health-indicator.service';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  providers: [PrismaHealthIndicatorService],
  imports: [TerminusModule, DatabaseModule],
  controllers: [HealthController],
})
export class HealthModule {}
