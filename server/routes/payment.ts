import express from 'express';
import { PaymentController } from '../controllers/PaymentController';
import { authenticateAccessToken } from '../middlewares/authenticate';

const router = express.Router();

router.post('/', authenticateAccessToken, PaymentController.createPayment);
router.put(
  '/:paymentId',
  authenticateAccessToken,
  PaymentController.updatePayment
);
router.delete(
  '/:paymentId',
  authenticateAccessToken,
  PaymentController.deletePayment
);

export default router;
