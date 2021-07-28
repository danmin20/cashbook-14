import express from 'express';
import { HistoryController } from '../controllers/HistoryController';
import { authenticateAccessToken } from '../middlewares/authenticate';

const router = express.Router();

router.post('/', authenticateAccessToken, HistoryController.createHistory);
router.put(
  '/:historyId',
  authenticateAccessToken,
  HistoryController.updateHistory
);
router.delete(
  '/:historyId',
  authenticateAccessToken,
  HistoryController.deleteHistory
);

export default router;
