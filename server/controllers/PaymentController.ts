import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/PaymentService';

async function createPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const { body } = req;
    // TODO: 필드 유효성 확인 (서비스에서 하는게 맞는듯)
    // 이름 중복 확인
    // ...

    // TODO
    const result = await PaymentService.createPayment({ userId, ...body });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function updatePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const { paymentId } = req.params;
    // TODO: forbidden check

    const { body } = req;
    // TODO: 필드 유효성 확인 (서비스에서 하는게 맞는듯)
    // 이름 중복 확인
    // ...

    // TODO
    const result = await PaymentService.updatePayment(
      { id: paymentId },
      { ...body }
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function deletePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.user;

    const { paymentId } = req.params;
    // TODO: forbidden check

    const result = await PaymentService.deletePayment({ id: paymentId });

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
