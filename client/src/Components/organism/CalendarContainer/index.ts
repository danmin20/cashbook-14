import { controller } from '@/Controller';
import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import { dateState } from '@/Model';
import { HistoriesType } from '@/Pages/Main';
import { getState, subscribe } from '@/utils/observer';
import Calendar from '@/Components/atom/Calendar';
import './style';

export default class CalendarContainer extends Component<PropsType, StateType> {
  histories: HistoriesType[] = [];

  $calendarBody: Element = jsx``;

  constructor(props: PropsType) {
    super(props);

    subscribe(dateState, 'calendar-date', this.update.bind(this));

    this.setDom();
  }

  willMount() {
    const fullDate = getState(dateState) as Date;
    const yy = fullDate.getFullYear();
    const mm = fullDate.getMonth();

    const firstDay = controller.calendar.getFirstDay(yy, mm);
    const lastDay = controller.calendar.getLastDay(yy, mm);
    let markToday = 0;

    if (
      mm === controller.calendar.today.getMonth() &&
      yy === controller.calendar.today.getFullYear()
    ) {
      markToday = controller.calendar.today.getDate();
    }

    this.$calendarBody = new Calendar({
      firstDay,
      lastDay,
      markToday,
    }).$dom;
  }

  render() {
    return jsx`
      <div class='calendar'>
        <div class='calendar__weekbar'>${controller.calendar.dayList.map(
          (day) => jsx`<div>${day}</div>`
        )}</div>

        <div class='cal-body' style='animation: calendar 0.3s'>
          ${this.$calendarBody}
        </div>
      </div>
    `;
  }
}
