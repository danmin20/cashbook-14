import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import Header from '@/Components/atom/Header';
import './style';
import PieGraph from '@/Components/atom/PieGraph';
import LinearGraph from '@/Components/atom/LinearGraph';
import List from '@/Components/molecule/list';
import DayList from '@/Components/atom/DayList';

export default class Chart extends Component<PropsType, StateType> {
  $header: Element;
  $pieGraph: Element;

  constructor(props: PropsType) {
    super(props);

    this.$header = new Header({}).$dom;
    this.$pieGraph = new PieGraph({}).$dom;

    this.setDom();
  }

  render() {
    return jsx`
      <div class='wrapper'>
        <div class='top'>
          ${this.$header}
        </div>

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
      </div>
    `;
  }
}
