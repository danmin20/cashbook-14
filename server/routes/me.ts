import express from 'express';
import { MeController } from '../controllers/MeController';

const router = express.Router();

router.get('/', MeController.getMe);
router.get('/payments', MeController.getMyPayments);
router.get('/categories', MeController.getMyCategories);
router.get('/histories', MeController.getMyHistories);
router.get('/sum-of-amounts', MeController.getSumOfAmounts);
router.get('/pure-histories', MeController.getMyPureHistories);

export default router;
