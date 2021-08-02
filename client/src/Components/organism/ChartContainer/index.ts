import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import './style';
import PieGraph from '@/Components/atom/PieGraph';
import LinearGraph from '@/Components/atom/LinearGraph';
import { getState, subscribe } from '@/core/observer';
import { dateState } from '@/Model';
import { getMyPureHistory } from '@/api/me';
import dayjs from 'dayjs';

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

  isLoading: boolean;

  constructor(props: PropsType) {
    super(props);

    this.$pieGraph = new PieGraph({}).$dom;
    this.$linearGraph = new LinearGraph({}).$dom;

    this.isLoading = false;
    const date = dayjs(getState(dateState) as Date).format('YYYY-MM');
    getMyPureHistory({ date, type: 'outcome' }).then((histories) => {
      histories;
    });

    this.setDom();
  }

  render() {
    return jsx`
        <div class="chart-wrapper">
            <div class="chart paper">
                ${this.$pieGraph}
                <div>
                <div class="title-active">
                    이번 달 지출 금액 834,640
                </div>
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
