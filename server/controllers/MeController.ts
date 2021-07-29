import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { PaymentService } from '../services/PaymentService';
import { CategoryService } from '../services/CategoryService';
import { HistoryService } from '../services/HistoryService';

async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.user;

    const result = await UserService.findUser({ email: email });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function getMyPayments(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const { query } = req;

    const result = await PaymentService.findPayments({ userId, ...query });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function getMyCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.user;

    const { query } = req;

    const result = await CategoryService.findCategories({ userId, ...query });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function getMyHistories(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const { query } = req;

    const head = query.date ? new Date(query.date as string) : new Date();
    const date = { year: head.getFullYear(), month: head.getMonth() };

    const result = await HistoryService.findHistories({
      userId,
      ...query,
      ...(query.date && { start: date }),
      ...(query.date && { last: date }),
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function getSumOfAmounts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.user;

    const { query } = req;

    const head = query.date ? new Date(query.date as string) : new Date();
    const last = { year: head.getFullYear(), month: head.getMonth() };
    const isUnderflow = last.month - 11 < 0;
    const start = {
      year: last.year - (isUnderflow ? 1 : 0),
      month: last.month - 11 + (isUnderflow ? 12 : 0),
    };

    const result = await HistoryService.getSumOfAmountsGroupByMonth({
      userId,
      ...query,
      start,
      last,
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export const MeController = {
  getMe,
  getMyPayments,
  getMyCategories,
  getMyHistories,
  getSumOfAmounts,
};
