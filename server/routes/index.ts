import express, { NextFunction, Response, Request } from 'express';

import authRouter from './auth';
import meRouter from './me';
import paymentRouter from './payment';
import categoryRouter from './category';
import historyRouter from './history';
import { authenticate } from '../middlewares/authenticate';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/me', authenticate, meRouter);
router.use('/payments', authenticate, paymentRouter);
router.use('/categories', authenticate, categoryRouter);
router.use('/histories', authenticate, historyRouter);

export default router;
