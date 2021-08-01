import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/PaymentService';

async function createPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.user;

    const { body } = req;

    const result = await PaymentService.createPayment({ userId, ...body });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function updatePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.user;

    const { paymentId } = req.params;

    const { body } = req;

    const result = await PaymentService.updatePayment(
      { id: parseInt(paymentId), userId },
      { ...body }
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function deletePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.user;

    const { paymentId } = req.params;

    const result = await PaymentService.deletePayment({
      id: parseInt(paymentId),
      userId,
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export const PaymentController = {
  createPayment,
  updatePayment,
  deletePayment,
};
