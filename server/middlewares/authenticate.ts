import { Response, NextFunction } from 'express';
import { AuthController } from '../controllers/AuthController';
import { User } from '../models/user';
import { UserService } from '../services/UserService';

export const authenticateAccessToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers['authorization'];

  if (!token) {
    next(Error);
  } else {
    const userData = await AuthController.getGithubUser(token);
    const { id } = (await UserService.findUser({
      githubId: userData.login,
    })) as User;

    // githubId, githubName
    req.user = { id, ...userData };
  }
};
