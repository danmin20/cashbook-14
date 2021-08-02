import dayjs from 'dayjs';
import { calendar, chart, file, left, right } from '@/../assets';
import { getMyMonthlyHistory } from '@/api/me';
import { controller } from '@/Controller';
import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import { $router } from '@/core/router';
import { dateState, userState } from '@/Model';
import { getState, setState, subscribe } from '@/core/observer';
import './style';
import DateSelect from '../DateSelect';

interface HeaderState {
  isDateSelectOpened: boolean;
}

export default class Header extends Component<PropsType, HeaderState> {
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
    return jsx`
      <div class='header' onClick=${() =>
        this.setState({ isDateSelectOpened: false })}>

        <div class='header__title' onClick=${() =>
          $router.push('/')}>우아한 가계부</div>
        
        <div class='date-controller'>
          <img class='arrow-btn' src=${left} onClick=${() =>
      controller.calendar.prevMonth()} />
          
          <div class='date' onClick=${(e: Event) => {
            e.stopPropagation();
            this.setState({ isDateSelectOpened: true });
          }}>
            <div class='date__month'>${dayjs(
              getState(dateState) as Date
            ).format('M')}월</div>
            <div class='date__year'>${dayjs(getState(dateState) as Date).format(
              'YYYY'
            )}</div>
      
            ${this.state.isDateSelectOpened ? this.$dateSelect : ''}
          </div>

          <img class='arrow-btn' src=${right} onClick=${() =>
      controller.calendar.nextMonth()} />

        </div>
        
        <div class='buttons'>
          <img class='${
            location.pathname === '/' ? '' : 'inactive'
          }' onClick=${() => $router.push('/')} src=${file} />
          <img class='${
            location.pathname === '/calendar' ? '' : 'inactive'
          }' onClick=${() => $router.push('/calendar')} src=${calendar} />
          <img class='${
            location.pathname === '/chart' ? '' : 'inactive'
          }' onClick=${() => $router.push('/chart')} src=${chart} />
        </div>
      </div>
    `;
  }
}
