import { dateState, userState } from '@/Model';
import { setState } from '@/core/observer';

export default {
  monList: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayList: ['일', '월', '화', '수', '목', '금', '토'],
  today: new Date(),
  monForChange: new Date().getMonth(),

  getFirstDay: (yy: number, mm: number) => new Date(yy, mm, 1),
  getLastDay: (yy: number, mm: number) => new Date(yy, mm + 1, 0),

  setDateState: setState(dateState),
  setHistoryState: setState(userState.myHistories),

  nextMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(++this.monForChange);
    this.setDateState(d);
  },
  prevMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(--this.monForChange);
    this.setDateState(d);
  },
};
