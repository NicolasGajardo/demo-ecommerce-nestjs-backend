import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Observable, map } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TransactionsQueryParams } from './dto/transactions.query-params';
import { TransactionModel } from 'src/common/database/models/transaction.model';
import { TransactionBody } from './dto/transaction.body';
import { TransactionsService } from './transactions.service';
import { Response } from 'express';

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

  @Post()
  @UseGuards(JwtAuthGuard)
  newTransaction(
    @Body() body: TransactionBody,
    @Res() res: Response,
  ): Observable<Response> {
    return this.transactionsService.save(body).pipe(
      map((transaction) => {
        return res
          .location('/transactions/' + transaction.uuid)
          .status(HttpStatusCode.Created)
          .send();
      }),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteTransaction(
    @Param('id') id: string,
    @Res() res: Response,
  ): Observable<Response> {
    return this.transactionsService.delete(id).pipe(
      map(() => {
        return res.status(HttpStatusCode.NoContent).send();
      }),
    );
  }
}
