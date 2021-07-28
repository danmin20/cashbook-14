import { controller } from '../../../Controller';
import Component, { PropsType } from '../../../core/Component';
import jsx from '../../../core/jsx';
import { dateState } from '../../../Model';
import { getState, subscribe } from '../../../utils/observer';
import './style';

export default class Calendar extends Component<PropsType> {
  constructor(props: PropsType) {
    super(props);

    subscribe(dateState, this.$dom.className, this.update.bind(this));

    this.setDom();
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
    return jsx`
      <div>
        ${[...Array(6).keys()].map(
          (i) =>
            jsx`<div class='${lastDay.getDate() > countDay ? 'cal-line' : ''}'>
              ${[...Array(7).keys()].map((j) => {
                if (i === 0 && !startCount && j === firstDay.getDay()) {
                  startCount = true;
                }

                const innerHTML = jsx`<div class='cal-box'${
                  markToday === countDay + 1 ? ' today' : ''
                }'>
                  <div class='cal-box__date'>${
                    startCount ? ++countDay : ''
                  }</div>
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

        <div class='cal-body'>
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
