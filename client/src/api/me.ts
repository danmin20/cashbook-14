import { fetchWrap } from '../utils/util';

export const getMyMonthlyHistory = ({ YYYYMM }: { YYYYMM: string }) =>
  fetchWrap('get', '/me/histories', { date: YYYYMM });

export const getMyIncomeCategories = () =>
  fetchWrap('get', '/me/categories', { type: 'income' });

export const getMyOutcomeCategories = () =>
  fetchWrap('get', '/me/categories', { type: 'outcome' });

export const getMyPayments = () => fetchWrap('get', '/me/payments');
