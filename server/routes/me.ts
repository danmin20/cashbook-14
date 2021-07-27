import express from 'express';
import { MeController } from '../controllers/MeController';
import { authenticateAccessToken } from '../middlewares/authenticate';

const router = express.Router();

router.get('/', authenticateAccessToken, MeController.getMe);
router.get('/payments', authenticateAccessToken, MeController.getMyPayments);
router.get(
  '/categories',
  authenticateAccessToken,
  MeController.getMyCategories
);
router.get('/histories', authenticateAccessToken, MeController.getMyHistories);

export default router;
