import { fetchWrap } from '../utils/util';

export const getMyMonthlyHistory = ({ YYYYMM }: { YYYYMM: string }) =>
  fetchWrap({ method: 'get', url: '/me/histories', params: { date: YYYYMM } });

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
