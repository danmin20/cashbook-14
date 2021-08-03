import { fetchWrap } from '@/utils/util';

export const getMyMonthlyHistory = ({ YYYYMM }: { YYYYMM: string }) =>
  fetchWrap({ method: 'get', url: '/me/histories', params: { date: YYYYMM } });

export const getMyPureHistory = ({
  date,
  type,
}: {
  date: string;
  type: 'income' | 'outcome';
}) =>
  fetchWrap({
    method: 'get',
    url: '/me/pure-histories',
    params: { date, type },
  });

export const getSumOfAmounts = ({
  date,
  categoryId,
  type,
}: {
  date: string;
  categoryId: number;
  type: 'income' | 'outcome';
}) =>
  fetchWrap({
    method: 'get',
    url: '/me/sum-of-amounts',
    params: { date, type, categoryId },
  });

export const getMyIncomeCategories = () =>
  fetchWrap({
    method: 'get',
    url: '/me/categories',
    params: { type: 'income' },
  });

export const getMyOutcomeCategories = () =>
  fetchWrap({
    method: 'get',
    url: '/me/categories',
    params: { type: 'outcome' },
  });

export const getMyPayments = () =>
  fetchWrap({ method: 'get', url: '/me/payments' });
