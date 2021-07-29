import dayjs from 'dayjs';
import { getMonthlyHistory } from '../../../../api/history';
import { controller } from '../../../Controller';
import Component, { PropsType } from '../../../core/Component';
import jsx from '../../../core/jsx';
import { dateState } from '../../../Model';
import { HistoryType } from '../../../shared/type';
import { getState, subscribe } from '../../../utils/observer';
import './style';

export interface CalendarState {
  clicked: 'left' | 'right';
  list: HistoryType[];
}

export default class Calendar extends Component<PropsType, CalendarState> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      clicked: 'left',
      list: [],
    };

    subscribe(dateState, 'calendar', this.update.bind(this));

    this.setDom();
  }

  willMount() {
    getMonthlyHistory({
      YYYYMM: dayjs(getState(dateState) as Date).format('YYYY-MM'),
    }).then((res) => this.setState({ list: res }));
  }

  didMount() {
    console.log(this.state.list);
    const days = this.$dom.querySelectorAll('.cal-box__history');
    days.forEach((day) => {
      this.state.list.forEach((item) => {
        if (day.id === dayjs(item.date).format('D')) {
          console.log(day.id, item.content);
          console.log(day);

          day.append(jsx`<div class="content">${item.amount}</div>`);
        }
      });
    });
  }

  loadYYMM = (fullDate: Date) => {
    let yy = fullDate.getFullYear();
    let mm = fullDate.getMonth();
    let firstDay = controller.calendar.getFirstDay(yy, mm);
    let lastDay = controller.calendar.getLastDay(yy, mm);
    let markToday: number; // for marking today date

    if (
      mm === controller.calendar.today.getMonth() &&
      yy === controller.calendar.today.getFullYear()
    ) {
      markToday = controller.calendar.today.getDate();
    }

    let startCount = false;
    let countDay = 0;

    const { list } = this.state;

    return jsx`
      <div>
        ${[...Array(6).keys()].map(
          (i) =>
            jsx`<div class='${lastDay.getDate() > countDay ? 'cal-line' : ''}'>
              ${[...Array(7).keys()].map((j) => {
                if (i === 0 && !startCount && j === firstDay.getDay()) {
                  startCount = true;
                }

                const innerHTML = jsx`<div class='cal-box${
                  markToday === countDay + 1 ? ' today' : ''
                }'>
                  
                    <div class='cal-box__date'>${
                      startCount ? ++countDay : ''
                    }</div>

                    <div id=${countDay.toString()} class='cal-box__history'>
                    </div>
                    
                  </div>`;

                if (countDay === lastDay.getDate()) {
                  startCount = false;
                }
                return innerHTML;
              })}
            </div>`
        )}
      </div>
    `;
  };

  render() {
    return jsx`
      <div class='calendar'>
        <div class='calendar__weekbar'>${controller.calendar.dayList.map(
          (day) => jsx`<div>${day}</div>`
        )}</div>

        <div class='cal-body' style='animation: calendar 0.3s'>
          ${this.loadYYMM(getState(dateState) as Date)}
          <div class='footer'>
            <div>
              총 수입 1,822,480
              총 지출 834,640
            </div>
            <div>
              총계 987,840
            </div>
            </div>
        </div>
      </div>
    `;
  }
}
