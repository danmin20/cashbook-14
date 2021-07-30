import {
  getMyIncomeCategories,
  getMyOutcomeCategories,
  getMyPayments,
} from '../../api/me';
import DayList, { DayListProps } from '../../Components/atom/DayList';
import Header from '../../Components/atom/Header';
import Alert from '../../Components/molecule/Alert';
import Info from '../../Components/molecule/Info';
import InputBar from '../../Components/molecule/InputBar';
import List, { ListProps } from '../../Components/molecule/list';
import Component, { PropsType } from '../../core/Component';
import jsx from '../../core/jsx';
import './style';

export interface MainStates {
  // 전역 상태로 넣기
  date: Date;
  histories: {
    day: DayListProps;
    list: ListProps[];
  }[];
  incomeCategories: [];
  outcomeCategories: [];
  payments: [];
}

export default class Main extends Component<PropsType, MainStates> {
  $header: Element;
  $inputBar: Element;
  $info: Element;
  $historyList: Element;
  $alert: Element;
  $categoryAlert: Element;

  constructor(props: any) {
    super(props);

    this.state = {
      date: new Date(),
      incomeCategories: [],
      outcomeCategories: [],
      histories: [],
      payments: [],
    };

    this.$header = new Header({}).$dom;

    this.$inputBar = new InputBar({}).$dom;

    this.$info = new Info({
      count: 23235235,
      income: 234234,
      outcome: 41451245,
      checked: ['income'],
    }).$dom;

    this.$historyList = document.createElement('div');
    this.state.histories.forEach(({ day, list }) => {
      const $dayList = new DayList({
        date: day.date,
        income: day.income,
        outcome: day.outcome,
      }).$dom;
      this.$historyList.append($dayList);

      list.forEach((history: ListProps) => {
        const $history = new List({
          tagId: history.tagId,
          tagTitle: history.tagTitle,
          type: history.type,
          content: history.content,
          payment: history.payment,
          paymentType: history.paymentType,
          amount: history.amount,
        }).$dom;
        this.$historyList.append($history);
      });
    });

    this.$alert = new Alert({
      select: 'payment',
      type: 'add',
      content: 'asdf',
    }).$dom;
    this.$categoryAlert = new Alert({
      select: 'category',
      type: 'add',
      content: 'asdf',
    }).$dom;

    this.setDom();
  }

  willMount() {
    getMyIncomeCategories().then((res) =>
      this.setState({ incomeCategories: res })
    );
    getMyOutcomeCategories().then((res) =>
      this.setState({ outcomeCategories: res })
    );
    getMyPayments().then((res) => this.setState({ outcomeCategories: res }));
  }

  render() {
    return jsx`
      <div class='wrapper'>
        <div class='top'>
          ${this.$header}
        </div>
        <div class='content'>
          <div class='input-bar-wrapper'>
            ${this.$inputBar}
          </div>
          ${this.$info}
          <div class='content__list'>
            ${this.$historyList}
            ${this.$categoryAlert}
          </div>
          <a href="http://localhost:3000/api/auth">깃허브 요청</a>
        </div>
      </div>
    `;
  }
}
