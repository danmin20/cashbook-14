import { fetchWrap } from '../utils/util';

export const createHistory = ({
  paymentId,
  categoryId,
  date,
  content,
  amount,
  paymentType,
}: {
  paymentId?: number;
  categoryId?: number;
  date: string;
  content: string;
  amount: number;
  paymentType: 'income' | 'outcome';
}) =>
  fetchWrap({
    method: 'post',
    url: '/histories',
    body: { paymentId, categoryId, date, content, amount, paymentType },
  });
