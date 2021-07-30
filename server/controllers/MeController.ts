import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { PaymentService } from '../services/PaymentService';
import { CategoryService } from '../services/CategoryService';
import { HistoryService } from '../services/HistoryService';
import { History } from '../models/history';

async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const { githubId } = req.session.user;

    const result = await UserService.findUser({ githubId });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function getMyPayments(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('aaa');
    const { userId } = req.session.user;
    console.log(req.session.user);

    const result = await PaymentService.findPayments({ userId });
    console.log(result);

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
    const { userId } = req.session.user;

    const { query } = req;

    const result = await CategoryService.findCategories({ userId, ...query });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

function getGroupedHistory(histories: History[]) {
  const groupedHistories: {
    [key: string]: {
      date: string;
      totalIncome: number;
      totalOutcome: number;
      histories: History[];
    };
  } = {};

  for (const history of histories) {
    if (!groupedHistories[history.date]) {
      groupedHistories[history.date] = {
        date: history.date,
        totalIncome: 0,
        totalOutcome: 0,
        histories: [],
      };
    }

    switch (history.paymentType) {
      case 'income':
        groupedHistories[history.date].totalIncome += +history.amount;
        break;
      case 'outcome':
        groupedHistories[history.date].totalOutcome += +history.amount;
        break;
    }

    groupedHistories[history.date].histories.push(history);
  }

  return Object.values(groupedHistories);
}

async function getMyHistories(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.session.user;

    const { query } = req;

    const date = query.date ? new Date(query.date as string) : new Date();
    const dateObject = { year: date.getFullYear(), month: date.getMonth() };

    const histories = await HistoryService.findHistories({
      userId,
      ...query,
      ...(query.date && { start: dateObject }),
      ...(query.date && { last: dateObject }),
    });

    const result = {
      totalIncome: 0,
      totalOutcome: 0,
      histories: getGroupedHistory(histories),
    };

    for (const history of histories) {
      switch (history.paymentType) {
        case 'income':
          result.totalIncome += +history.amount;
          break;
        case 'outcome':
          result.totalOutcome += +history.amount;
          break;
      }
    }

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
    const { userId } = req.session.user;

    const { query } = req;

    const date = query.date ? new Date(query.date as string) : new Date();
    const last = { year: date.getFullYear(), month: date.getMonth() };
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
