import { initState } from '@/core/observer';

export default initState({
  key: 'historyInput',
  defaultValue: {
    paymentType: 'outcome',
    date: '',
    category: {
      id: 0,
      name: '',
    },
    content: '',
    payment: {
      id: 0,
      name: '',
    },
    amount: 0,
  },
});
