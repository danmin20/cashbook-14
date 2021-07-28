import { Request, Response, NextFunction } from 'express';
import { HistoryService } from '../services/HistoryService';

async function createHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const { body } = req;

    const result = await HistoryService.createHistory({ userId, ...body });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function updateHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const { historyId } = req.params;

    const { body } = req;

    const result = await HistoryService.updateHistory(
      { id: historyId, userId },
      { ...body }
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function deleteHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const { historyId } = req.params;

    const result = await HistoryService.deleteHistory({
      id: historyId,
      userId,
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export const HistoryController = {
  createHistory,
  updateHistory,
  deleteHistory,
};
