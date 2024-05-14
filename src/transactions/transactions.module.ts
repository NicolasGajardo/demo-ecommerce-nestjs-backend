import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [DatabaseModule, JwtModule],
  exports: [TransactionsService],
})
export class TransactionsModule {}
