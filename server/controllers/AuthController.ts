import { Request, Response, NextFunction } from 'express';

// TODO
async function login(req: Request, res: Response, next: NextFunction) {}

// TODO
async function register(req: Request, res: Response, next: NextFunction) {}

export const AuthController = {
  login,
  register,
};
