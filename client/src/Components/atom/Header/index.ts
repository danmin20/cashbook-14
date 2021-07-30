import dayjs from 'dayjs';
import { calendar, chart, file, left, right } from '../../../../assets';
import { getMyMonthlyHistory } from '../../../api/me';
import { controller } from '../../../Controller';
import Component, { PropsType, StateType } from '../../../core/Component';
import jsx from '../../../core/jsx';
import { $router } from '../../../lib/router';
import { dateState, userState } from '../../../Model';
import { getState, setState, subscribe } from '../../../utils/observer';
import './style';

export default class Header extends Component<PropsType, StateType> {
  pathname: '/' | '/calendar' | '/chart';
  $date: Element = jsx``;

  constructor(props: PropsType) {
    super(props);

    this.pathname = window.location.href.split('/#')[1] as
      | '/'
      | '/calendar'
      | '/chart';

    subscribe(dateState, 'date', this.update.bind(this));

    this.setDom();
  }

  willMount() {
    console.log(dayjs(getState(dateState) as Date).format('M'));
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
            this.pathname === '/' ? '' : 'inactive'
          }' onClick=${() => $router.push('/')} src=${file} />
          <img class='${
            this.pathname === '/calendar' ? '' : 'inactive'
          }' onClick=${() => $router.push('/calendar')} src=${calendar} />
          <img class='${
            this.pathname === '/chart' ? '' : 'inactive'
          }' onClick=${() => $router.push('/chart')} src=${chart} />
        </div>
      </div>
    `;
  }
}
