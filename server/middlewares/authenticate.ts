import { Response, NextFunction, Request } from 'express';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.session?.user;

  if (!user) {
    res.json({
      message: 'forbidden',
    });
  } else {
    req.user = user;
    next();
  }
};
