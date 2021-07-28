import { calendar, chart, file, left, right } from '../../../../assets';
import { controller } from '../../../Controller';
import Component, { PropsType, StateType } from '../../../core/Component';
import jsx from '../../../core/jsx';
import { $router } from '../../../lib/router';
import { dateState } from '../../../Model';
import { getState, subscribe } from '../../../utils/observer';
import './style';

export default class Header extends Component<PropsType, StateType> {
  pathname: '/' | '/calendar' | '/chart';
  constructor(props: PropsType) {
    super(props);

    this.pathname = window.location.href.split('/#')[1] as
      | '/'
      | '/calendar'
      | '/chart';

    subscribe(dateState, 'header', this.update.bind(this));

    this.setDom();
  }
  render() {
    return jsx`
      <div class='header'>
        <div class='header__title' onClick=${() =>
          $router.push('/')}>우아한 가계부</div>
        
        <div class='date-controller'>
          <img src=${left} onClick=${() => controller.calendar.prevMonth()} />
          
          <div class='date'>
            <div class='date__month'>${
              (getState(dateState) as Date).getMonth() + 1
            }월</div>
            <div class='date__year'>${(
              getState(dateState) as Date
            ).getFullYear()}</div>
          </div>
          
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
