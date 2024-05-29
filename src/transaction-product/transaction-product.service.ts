import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { TransactionProductModel } from 'src/common/database/models/transaction-product.model';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class TransactionProductService {
  // constructor(
  //   // @InjectRepository(TransactionProductModel)
  //   // private readonly transactionProductsRepository: Repository<TransactionProductModel>,
  //   // @Inject(REQUEST) private readonly req: AuthenticatedRequest,
  // ) {}
  // save(
  //   trxBody: Partial<TransactionProductModel>,
  // ): Observable<TransactionProductModel> {
  //   // return from(this.transactionProductsRepository.save(trxBody));
  // }
}
