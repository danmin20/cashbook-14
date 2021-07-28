import { initState } from '../utils/observer';

export default initState({
  key: 'dateState',
  defaultValue: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  },
});
