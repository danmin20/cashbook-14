import { ListProps } from '@/Components/molecule/list';

export type HistoryType = {
  id: number;
  paymentType: number;
  amount: number;
  category: {
    id: number;
    name: string;
    type: string;
  };
  content: string;
  date: string;
  payment: {
    id: number;
    name: string;
  };
};

export type CategoryType = {
  id?: number;
  name: string;
  type?: string;
  color: string;
};

export type PaymentType = {
  id: number;
  name: string;
};

export type AllHistorytype = {
  date: string;
  histories: HistoriesType[];
  totalIncome: number;
  totalOutcome: number;
  totalCount: number;
  totalIncomeCount: number;
  totalOutcomeCount: number;
};

export type HistoriesType = {
  date: string;
  histories: ListProps[];
  totalIncome: number;
  totalOutcome: number;
};
