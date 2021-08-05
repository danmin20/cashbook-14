import dayjs from 'dayjs';
import Component, { PropsType } from '@/core/Component';
import jsx from '@/core/jsx';
import './style';
import { getState, subscribe } from '@/core/observer';
import { dateState } from '@/Model';
import { getMyPureHistory } from '@/api/me';
import { GroupedHistoriesByCategory, HistoryType } from '@/shared/type';
import Chart from '@/Components/molecule/Chart';

interface ChartContainerState {
  isLoaded: boolean;
  groupedData: GroupedHistoriesByCategory[];
}

/*
  주요 역할: subscribe, fetching, mount
*/
export default class ChartContainer extends Component<
  PropsType,
  ChartContainerState
> {
  lastPromise: Promise<any> | null = null;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      groupedData: [],
      isLoaded: false,
    };

    this.fetchAndGroupAndRenderData();
    subscribe(dateState, 'chart-container', this.handleChangeDate.bind(this));

    this.setDom();
  }

  handleChangeDate() {
    this.fetchAndGroupAndRenderData();
  }

  async fetchAndGroupAndRenderData() {
    const date = dayjs(getState(dateState) as Date).format('YYYY-MM');
    const promise = getMyPureHistory({ date, type: 'outcome' });
    this.lastPromise = promise;
    const histories = await promise;
    if (this.lastPromise !== promise) {
      return;
    }

    const groupedDataBuilder: {
      [key: string]: GroupedHistoriesByCategory;
    } = {};
    histories.forEach((history: HistoryType) => {
      if (!history.category) {
        return;
      }
      if (!groupedDataBuilder[history.category.id]) {
        groupedDataBuilder[history.category.id] = {
          categoryId: history.category.id,
          category: history.category.name,
          amount: 0,
          color: history.category.color,
          histories: [],
        };
      }
      groupedDataBuilder[history.category.id].amount += +history.amount;
      groupedDataBuilder[history.category.id].histories.push(history);
    });
    const groupedData = Object.values(groupedDataBuilder).sort(
      (a, b) => b.amount - a.amount
    );

    this.setState({ isLoaded: true, groupedData });
  }

  render() {
    const { isLoaded, groupedData } = this.state;

    // TODO: 로딩이 된 시점에 자연스러운 fade out
    if (!isLoaded) {
      return jsx`
        <div class="chart-wrapper">
          <div class='chart-loading'>
            <div class="loader" />
          </div>
        </div>
      `;
    }

    return new Chart({ data: groupedData }).$dom;
  }
}
