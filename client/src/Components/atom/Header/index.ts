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

export default class Header extends Component<PropsType, StateType> {
  $date: Element = jsx``;

  constructor(props: PropsType) {
    super(props);

    subscribe(dateState, 'date', this.update.bind(this));

    this.setDom();
  }

  willMount() {
    const setHistories = setState(userState.myHistories);
    getMyMonthlyHistory({
      YYYYMM: dayjs(getState(dateState) as Date).format('YYYY-MM'),
    }).then((res) => {
      setHistories(res);
    });

    this.$date = jsx`<div class='date'>
    <div class='date__month'>${dayjs(getState(dateState) as Date).format(
      'M'
    )}월</div>
    <div class='date__year'>${dayjs(getState(dateState) as Date).format(
      'YYYY'
    )}</div>
  </div>`;
  }

  render() {
    return jsx`
      <div class='header'>

        <div class='header__title' onClick=${() =>
          $router.push('/')}>우아한 가계부</div>
        
        <div class='date-controller'>
          <img src=${left} onClick=${() => controller.calendar.prevMonth()} />
          
          ${this.$date}

          <img src=${right} onClick=${() => controller.calendar.nextMonth()} />
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
