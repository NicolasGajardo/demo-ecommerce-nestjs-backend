import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TransactionsQueryParams } from './dto/transactions.query-params';
import { TransactionsService } from './transactions.service';
import { Transaction as TransactionModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller({ path: 'transactions', scope: Scope.REQUEST })
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Get()
  getTransactions(
    @Query() transactionsQueryParamsDto: TransactionsQueryParams,
  ): Observable<{ data: TransactionModel[]; count: number }> {
    return this.transactionsService.findAll(transactionsQueryParamsDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Get(':id')
  getTransaction(@Param('id') id: string): Observable<
    TransactionModel & {
      products: {
        productQuantity: number;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        transactionId: string;
      }[];
    }
  > {
    return this.transactionsService.findById(id);
  }
}
