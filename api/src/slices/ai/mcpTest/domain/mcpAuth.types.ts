import { Request } from 'express';
import { IUserData } from '#user/user/domain';

export interface RequestWithUser extends Request {
  user?: IUserData;
  cognito_user?: {
    email: string;
  };
}
