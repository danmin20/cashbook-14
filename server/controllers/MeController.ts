import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { PaymentService } from '../services/PaymentService';
import { CategoryService } from '../services/CategoryService';
import { HistoryService } from '../services/HistoryService';

async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const result = await UserService.findUser({ id: userId });

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

    const result = await HistoryService.findHistories({ userId, ...query });

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
};
