import { Controller, Get, Param, Query, Scope } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TransactionsQueryParams } from './dto/transactions.query-params';
import { TransactionModel } from 'src/common/database/models/transaction.model';
import { TransactionsService } from './transactions.service';

@Controller({ path: 'transactions', scope: Scope.REQUEST })
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getTransactions(
    @Query() TransactionsQueryParamsDto: TransactionsQueryParams,
  ): Observable<{ data: TransactionModel[]; count: number }> {
    return this.transactionsService.findAll(TransactionsQueryParamsDto);
  }

  @Get(':id')
  getTransaction(@Param('id') id: string): Observable<TransactionModel> {
    return this.transactionsService.findById(id);
  }
}
