import { Injectable, Scope } from '@nestjs/common';
// import { REQUEST } from '@nestjs/core';
// import { Observable, from } from 'rxjs';
// import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';

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
