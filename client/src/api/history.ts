import { fetchWrap } from '@/utils/util';

export const createHistory = ({
  paymentId,
  categoryId,
  date,
  content,
  amount,
  type,
}: {
  paymentId?: number;
  categoryId?: number;
  date: string;
  content: string;
  amount: number;
  type: 'income' | 'outcome';
}) =>
  fetchWrap({
    method: 'post',
    url: '/histories',
    body: { paymentId, categoryId, date, content, amount, type },
  });
