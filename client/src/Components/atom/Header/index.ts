import { calendar, chart, file, left, right } from '@/../assets';
import { controller } from '@/Controller';
import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import { $router } from '@/core/router';
import HeaderDate from './date';
import './style';

export default class Header extends Component<PropsType, StateType> {
  $headerDate: Element = jsx``;

  constructor(props: PropsType) {
    super(props);

    this.$headerDate = new HeaderDate({}).$dom;

    this.setDom();
  }

  render() {
    return jsx`
      <div class='header'>

        <div class='header__title' onClick=${() =>
          $router.push('/')}>우아한 가계부</div>
        
        <div class='date-controller'>
          <img class='arrow-btn' src=${left} onClick=${() =>
      controller.calendar.prevMonth()} />
          
        ${this.$headerDate}  

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
