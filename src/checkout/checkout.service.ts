import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';

@Injectable({ scope: Scope.DEFAULT })
export class CheckoutService {
  constructor(@Inject(REQUEST) private readonly req: AuthenticatedRequest) {}

  checkout(): Observable<any> {
    this.req.user.email;

    return null;
  }
}
