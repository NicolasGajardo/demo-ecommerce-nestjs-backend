import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EMPTY,
  Observable,
  from,
  map,
  of,
  switchMap,
  throwIfEmpty,
} from 'rxjs';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { TransactionModel } from 'src/common/database/models/transaction.model';
import { Repository } from 'typeorm';
import { TransactionsQueryParams } from './dto/transactions.query-params';
import { TransactionBody } from './dto/transaction.body';
import { Mapper } from 'src/common/utils/mapper';

@Injectable({ scope: Scope.REQUEST })
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionModel)
    private readonly transactionsRepository: Repository<TransactionModel>,
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
  ) {}

  findAll(
    req: TransactionsQueryParams,
  ): Observable<{ data: TransactionModel[]; count: number }> {
    const { limit, page, sortBy } = req;
    return from(
      limit
        ? this.transactionsRepository.findAndCount({
            order: { createdAt: sortBy || 'DESC' },
            take: limit as number,
            skip: (page || 0) * (limit as number),
          })
        : this.transactionsRepository.findAndCount(),
    ).pipe(
      map((transactions) => {
        const [result, total] = transactions;
        return {
          data: result,
          count: total,
        };
      }),
    );
  }

  findById(uuid: string): Observable<TransactionModel> {
    return from(
      this.transactionsRepository.findOneBy({
        uuid: uuid,
      }),
    ).pipe(
      switchMap((transactionExists) =>
        transactionExists ? of(transactionExists) : EMPTY,
      ),
      throwIfEmpty(
        () => new NotFoundException(`transaction: ${uuid} was not found`),
      ),
    );
  }

  save(transactionBody: Partial<TransactionBody>) {
    const newtransaction: TransactionModel =
      Mapper.mapTransactionBodyToTransactionModel(
        transactionBody,
        this.req.user,
      );

    return from(this.transactionsRepository.save(newtransaction));
  }

  delete(uuid: string) {
    return from(
      this.transactionsRepository.existsBy({
        uuid: uuid,
        buyerUser: this.req.user,
      }),
    ).pipe(
      switchMap((transactionExists) =>
        transactionExists ? of(transactionExists) : EMPTY,
      ),
      throwIfEmpty(
        () => new NotFoundException(`transaction: ${uuid} was not found`),
      ),
      switchMap(() => this.transactionsRepository.delete({ uuid: uuid })),
    );
  }
}
