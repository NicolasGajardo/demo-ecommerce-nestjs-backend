import { Request } from 'express';
import { UserModel } from '../database/models/user';

export interface ExpressRequest<ReqBody = any> extends Request {
  user: UserModel;
  userEmail: string;
  body: ReqBody;
}
