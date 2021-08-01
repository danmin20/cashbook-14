import express from 'express';
import { PaymentController } from '../controllers/PaymentController';

const router = express.Router();

router.post('/', PaymentController.createPayment);
router.put('/:paymentId', PaymentController.updatePayment);
router.delete('/:paymentId', PaymentController.deletePayment);

export default router;
