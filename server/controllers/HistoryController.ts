import { Request, Response, NextFunction } from 'express';
import { HistoryService } from '../services/HistoryService';

async function createHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const { body } = req;
    // TODO: 필드 유효성 확인 (서비스에서 하는게 맞는듯)
    // 타입이 카테고리의 것과 같은가?
    // 본인의 카테고리인가?
    // 본인의 결제수단인가?
    // ...

    // TODO
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
    // TODO: forbidden check

    const { body } = req;
    // TODO: 필드 유효성 확인 (서비스에서 하는게 맞는듯)
    // 타입이 카테고리의 것과 같은가?
    // 본인의 카테고리인가?
    // 본인의 결제수단인가?
    // ...

    // TODO
    const result = await HistoryService.updateHistory(
      { id: historyId },
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
    // TODO: forbidden check

    const result = await HistoryService.deleteHistory({ id: historyId });

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
