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
  defaultValue: [],
});

export default {
  myIncomeCategories,
  myOutcomeCategories,
  myPayments,
  myHistories,
};
