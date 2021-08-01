import express from 'express';
import { HistoryController } from '../controllers/HistoryController';

const router = express.Router();

router.post('/', HistoryController.createHistory);
router.put('/:historyId', HistoryController.updateHistory);
router.delete('/:historyId', HistoryController.deleteHistory);

export default router;
