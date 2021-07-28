import { Request, Response, NextFunction, json } from 'express';
import { CategoryService } from '../services/CategoryService';
import { PaymentService } from '../services/PaymentService';
import { UserService } from '../services/UserService';

// TODO
async function login(req: Request, res: Response, next: NextFunction) {}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId, nickname, password } = req.body;

    const result = await UserService.createUser({
      id: userId,
      nickname,
      password,
    });

    for (const { name, type, color } of defaultCategories) {
      await CategoryService.createCategory({ userId, name, type, color });
    }

    for (const { name } of defaultPayments) {
      await PaymentService.createPayment({ userId, name });
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export const AuthController = {
  login,
  register,
};

const defaultPayments = [
  {
    name: '현금',
  },
  {
    name: '현대카드',
  },
  {
    name: '신한카드',
  },
];

const defaultCategories = [
  {
    name: '생활',
    type: '지출',
    color: '#4a6cc3',
  },
  {
    name: '식비',
    type: '지출',
    color: '#4ca1de',
  },
  {
    name: '교통',
    type: '지출',
    color: '#94d3cc',
  },
  {
    name: '쇼핑/뷰티',
    type: '지출',
    color: '#4cb8b8',
  },
  {
    name: '의료/건강',
    type: '지출',
    color: '#6ed5eb',
  },
  {
    name: '문화/여가',
    type: '지출',
    color: '#d092e2',
  },
  {
    name: '미분류',
    type: '지출',
    color: '#817dce',
  },
  {
    name: '월급',
    type: '수입',
    color: '#b9d58c',
  },
  {
    name: '용돈',
    type: '수입',
    color: '#e6d267',
  },
  {
    name: '기타수입',
    type: '수입',
    color: '#e2b765',
  },
];
