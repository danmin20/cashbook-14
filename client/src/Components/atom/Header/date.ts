import { getMyMonthlyHistory } from '@/api/me';
import Component, { PropsType } from '@/core/Component';
import jsx from '@/core/jsx';
import { getState, setState, subscribe } from '@/core/observer';
import { dateState, userState } from '@/Model';
import dayjs from 'dayjs';
import DateSelect from '../DateSelect';
import './style';

interface HeaderDateState {
  isDateSelectOpened: boolean;
}

export default class HeaderDate extends Component<PropsType, HeaderDateState> {
  $dateSelect: Element = jsx``;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      isDateSelectOpened: false,
    };

    subscribe(dateState, 'date', this.update.bind(this));

    this.setDom();
  }

  willMount() {
    this.$dateSelect = new DateSelect({
      beforeDate: {
        year: dayjs(getState(dateState) as Date).format('YYYY'),
        month: dayjs(getState(dateState) as Date).format('M'),
      },
    }).$dom;

    const setHistories = setState(userState.myHistories);
    getMyMonthlyHistory({
      YYYYMM: dayjs(getState(dateState) as Date).format('YYYY-MM'),
    }).then((res) => {
      setHistories(res);
    });
  }

  render() {
    const { isDateSelectOpened } = this.state;

    return jsx`
    <div class='date' onClick=${() =>
      this.setState({ isDateSelectOpened: !isDateSelectOpened })}>
        <div class='date__month'>${dayjs(getState(dateState) as Date).format(
          'M'
        )}월</div>
        <div class='date__year'>${dayjs(getState(dateState) as Date).format(
          'YYYY'
        )}</div>
  
        ${isDateSelectOpened ? this.$dateSelect : ''}
      </div>
    `;
  }
}
