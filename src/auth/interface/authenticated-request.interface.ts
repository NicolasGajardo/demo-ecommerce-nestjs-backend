import { Request } from 'express';
import { AuthenticatedUser } from 'src/auth/interface/authenticated-user.interface';

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
