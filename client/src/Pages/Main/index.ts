import dayjs from 'dayjs';
import {
  getMyIncomeCategories,
  getMyMonthlyHistory,
  getMyOutcomeCategories,
  getMyPayments,
} from '../../api/me';
import DayList from '../../Components/atom/DayList';
import Header from '../../Components/atom/Header';
import Alert from '../../Components/molecule/Alert';
import Info from '../../Components/molecule/Info';
import InputBar from '../../Components/molecule/InputBar';
import List, { ListProps } from '../../Components/molecule/list';
import Component, { PropsType } from '../../core/Component';
import jsx from '../../core/jsx';
import { dateState, userState } from '../../Model';
import { getState, setState, subscribe } from '../../utils/observer';
import './style';

export interface MainStates {
  // 전역 상태로 넣기
  date: Date;
  histories: AllHistorytype;
  incomeCategories: [];
  outcomeCategories: [];
  payments: [];
}

type AllHistorytype = {
  date: string;
  histories: HistoriesType[];
  totalIncome: number;
  totalOutcome: number;
};

type HistoriesType = {
  date: string;
  histories: ListProps[];
  totalIncome: number;
  totalOutcome: number;
};

export default class Main extends Component<PropsType, MainStates> {
  $header: Element;
  $inputBar: Element;
  $info: Element;
  $historyList: Element = jsx``;
  $alert: Element;
  $categoryAlert: Element;

  constructor(props: any) {
    super(props);

    subscribe(userState.myHistories, 'a', this.update.bind(this));

    this.state = {
      date: new Date(),
      incomeCategories: [],
      outcomeCategories: [],
      histories: {
        date: '',
        histories: [],
        totalIncome: 0,
        totalOutcome: 0,
      },
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

    const setIncomeCategories = setState(userState.myIncomeCategories);
    const setOutcomeCategories = setState(userState.myOutcomeCategories);
    const setPayments = setState(userState.myPayments);

    getMyIncomeCategories().then((res) => setIncomeCategories(res));
    getMyOutcomeCategories().then((res) => setOutcomeCategories(res));
    getMyPayments().then((res) => setPayments(res));

    this.setDom();
  }

  willUpdate() {
    const histories = getState(userState.myHistories) as AllHistorytype;

    this.$historyList = jsx`<div>${histories?.histories.map(
      ({ date, histories, totalIncome, totalOutcome }) => {
        return jsx`<div>${
          new DayList({
            date,
            income: totalIncome,
            outcome: totalOutcome,
          }).$dom
        }
       ${histories.map((history: ListProps) => {
         return jsx`<div>${
           new List({
             listType: 'large',
             content: history.content,
             payment: history.payment,
             paymentType: history.paymentType,
             amount: history.amount,
             category: {
               name: history.category.name,
               color: history.category.color,
             },
           }).$dom
         }</div>`;
       })}
      </div>`;
      }
    )}</div>`;
  }

  render() {
    return jsx`
      <div class='main-wrapper'>
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
