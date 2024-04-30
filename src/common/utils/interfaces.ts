import { Request } from 'express';
import { User } from '../database/models/user';

export interface ExpressRequest<ReqBody = any> extends Request {
  user: User;
  userEmail: string;
  body: ReqBody;
}
