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
    type: string;
  };
};
