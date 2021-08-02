import dayjs from 'dayjs';
import Component from '@/core/Component';
import jsx from '@/core/jsx';
import './style';
import { returnPrice } from '@/utils/util';

export interface DayListProps {
  date: string;
  income?: number;
  outcome?: number;
}

export default class DayList extends Component<DayListProps> {
  constructor(props: DayListProps) {
    super(props);

    this.setDom();
  }
  days = ['일', '월', '화', '수', '목', '금', '토'];
  render() {
    const { date, income, outcome } = this.props;

    return jsx`
      <div class='day-list'>
        <div>
          ${dayjs(date).format('M월 D일')} <span>${
      this.days[parseInt(dayjs(date).format('d'))]
    }</span>
        </div>
        <div class='day-list__sum'>
          ${
            income
              ? jsx`<div class='day-list__sum--each'>수입 ${returnPrice(
                  income
                )}</div>`
              : ''
          }
          <div class='day-list__sum--each'>
            지출 ${returnPrice(outcome)}
          </div>
        </div>
      </div>
    `;
  }
}
