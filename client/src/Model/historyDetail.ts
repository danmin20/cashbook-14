import { initState } from '@/core/observer';
import { HistoriesType } from '@/shared/type';

export default initState({
  key: 'historyDetail',
  defaultValue: {
    histories: [],
    isModalOpened: false,
  },
});

export type HistoryDetailType = {
  histories: HistoriesType;
  isModalOpened: boolean;
};
