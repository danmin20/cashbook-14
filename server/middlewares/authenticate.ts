import { Response, NextFunction, Request } from 'express';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.session?.user;
  console.log(user);

  if (!user) {
    // console.log('redirect');
    // // res.redirect('http://localhost:3000/api/auth');
    res.redirect('/login');
  } else {
    req.user = user;
    next();
  }
};
