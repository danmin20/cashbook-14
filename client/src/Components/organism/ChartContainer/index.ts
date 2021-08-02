import dayjs from 'dayjs';
import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import './style';
import PieGraph from '@/Components/atom/PieGraph';
import LinearGraph from '@/Components/atom/LinearGraph';
import List from '@/Components/molecule/list';
import { getState, subscribe } from '@/core/observer';
import { dateState } from '@/Model';
import { getMyPureHistory } from '@/api/me';
import { returnPrice } from '@/utils/util';
import { HistoryType } from '@/shared/type';

/*
TODO:
  로딩 중 UI 표시하기 ( 로딩 완료 시 전환 부드럽게 하기 )
  dateState 변경 시 다시 fetch하여(?) render 해도 되고,.... userState.histories를 구독해도 되는데....
  리스트 클릭 -> render, 화면 스크롤하기~ (이거 좀 ㅠ)
    linearGraph 내부에서 fetch, render 해보기~ ( 로딩 중 표시하기 마찬가지로 부드럽게 전환하기 )
*/
export default class ChartContainer extends Component<PropsType, StateType> {
  $pieGraph: Element;
  $linearGraph: Element;

  isOpened: boolean;
  isLoaded: boolean;
  groupedData: {
    category: string;
    amount: number;
    color: string;
    histories: HistoryType[];
  }[];
  totalOutcome: number;
  lastPromise: Promise<any> | null;

  constructor(props: PropsType) {
    super(props);

    this.groupedData = [];
    this.totalOutcome = 0;
    this.lastPromise = null;

    this.$pieGraph = new PieGraph({ data: this.groupedData }).$dom;
    this.$linearGraph = new LinearGraph({}).$dom;

    this.isOpened = false;
    this.isLoaded = false;
    this.handleChangeDate();

    subscribe(dateState, 'chart-container', this.handleChangeDate.bind(this));

    this.setDom();
  }

  async handleChangeDate() {
    this.totalOutcome = 0;
    const date = dayjs(getState(dateState) as Date).format('YYYY-MM');
    const promise = getMyPureHistory({ date, type: 'outcome' });
    this.lastPromise = promise;
    const histories = await promise;
    if (this.lastPromise !== promise) {
      return;
    }
    const groupedDataBuilder: {
      [key: string]: {
        category: string;
        amount: number;
        color: string;
        histories: HistoryType[];
      };
    } = {};

    histories.forEach((history) => {
      if (!groupedDataBuilder[history.category.id]) {
        groupedDataBuilder[history.category.id] = {
          category: history.category.name,
          amount: 0,
          color: history.category.color,
          histories: [],
        };
      }
      groupedDataBuilder[history.category.id].amount += +history.amount;
      groupedDataBuilder[history.category.id].histories.push(history);
      this.totalOutcome += +history.amount;
    });

    this.groupedData = Object.values(groupedDataBuilder).sort(
      (a, b) => a.amount - b.amount
    );

    this.$pieGraph = new PieGraph({ data: this.groupedData }).$dom;
    this.isLoaded = true;
    this.update();
  }

  render() {
    if (!this.isLoaded) {
      return jsx`
        <div class='chart-loading'>
          <div class="loader" />
        </div>
      `;
    }

    return jsx`
        <div class="chart-wrapper">
            <div class="chart paper">
                ${this.$pieGraph}
                <div>
                  <div class="title-active">
                      이번 달 지출 금액 ${returnPrice(this.totalOutcome)}원
                  </div>
                  ${this.groupedData.map((data) => {
                    return new List({
                      category: { name: data.category, color: data.color },
                      listType: 'small',
                      type: 'outcome',
                      content: `${Math.floor(
                        (data.amount / this.totalOutcome) * 100
                      )}%`,
                      amount: data.amount,
                    }).$dom;
                  })}
                </div>
            </div>

            <div class="paper">
                <div class="title-active">
                생활 카테고리 소비 추이
                </div>

                <div>
                ${new LinearGraph({}).$dom}
                </div>
            </div>

            <div>
            </div>
        </div>
    `;
  }
}
