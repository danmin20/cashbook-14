import { Response, NextFunction, Request } from 'express';
import { AuthController } from '../controllers/AuthController';
import { User } from '../models/user';
import { UserService } from '../services/UserService';

export const authenticateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.session.user);
  const user = req.session.user;

  if (!user) {
    next(Error);
  } else {
    req.user = user;
  }
};
