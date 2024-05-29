import { Controller, Get, Param, Query, Scope } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TransactionsQueryParams } from './dto/transactions.query-params';
import { TransactionsService } from './transactions.service';
import { Transaction as TransactionModel } from '@prisma/client';

@Controller({ path: 'transactions', scope: Scope.REQUEST })
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getTransactions(
    @Query() transactionsQueryParamsDto: TransactionsQueryParams,
  ): Observable<{ data: TransactionModel[]; count: number }> {
    return this.transactionsService.findAll(transactionsQueryParamsDto);
  }

  @Get(':id')
  getTransaction(@Param('id') id: string): Observable<TransactionModel> {
    return this.transactionsService.findById(id);
  }
}
