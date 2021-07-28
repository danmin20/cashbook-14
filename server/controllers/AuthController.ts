import { Request, Response, NextFunction } from 'express';

async function login(req: Request, res: Response, next: NextFunction) {}

async function register(req: Request, res: Response, next: NextFunction) {}

export const AuthController = {
  login,
  register,
};
