import { Request } from 'express';
import { UserModel } from '../database/models/user.model';

export interface ExpressRequest extends Request {
  readonly user: UserModel;
}
