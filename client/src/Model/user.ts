import dayjs from 'dayjs';
import { getMyMonthlyHistory } from '../api/me';
import { initState } from '../utils/observer';

const myIncomeCategories = initState({
  key: 'myIncomeCategories',
  defaultValue: [],
});

const myOutcomeCategories = initState({
  key: 'myOutcomeCategories',
  defaultValue: [],
});

const myPayments = initState({
  key: 'myPayments',
  defaultValue: [],
});

const myHistories = initState({
  key: 'myHistories',
  defaultValue: getMyMonthlyHistory({
    YYYYMM: dayjs(new Date()).format('YYYY-MM'),
  }),
});

export default {
  myIncomeCategories,
  myOutcomeCategories,
  myPayments,
  myHistories,
};
