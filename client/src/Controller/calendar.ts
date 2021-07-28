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
  activeDate: new Date(),

  getFirstDay: (yy: number, mm: number) => new Date(yy, mm, 1),
  getLastDay: (yy: number, mm: number) => new Date(yy, mm + 1, 0),
  nextMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(++this.monForChange);
    this.activeDate = d;
    return d;
  },
  prevMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(--this.monForChange);
    this.activeDate = d;
    return d;
  },
  addZero: (num: number) => (num < 10 ? '0' + num : num),
  activeDTag: null,
  getIndex: function (node: Element) {
    let index = 0;
    while ((node = node.previousElementSibling as Element)) {
      index++;
    }
    return index;
  },
};
