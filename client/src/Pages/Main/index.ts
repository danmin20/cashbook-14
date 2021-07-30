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
import Histories from './histories';
import './style';

export interface MainStates {
  // 전역 상태로 넣기
  date: Date;
  histories: AllHistorytype;
  incomeCategories: [];
  outcomeCategories: [];
  payments: [];
}

export type AllHistorytype = {
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
  $historyList: Element;
  $alert: Element;
  $categoryAlert: Element;

  constructor(props: any) {
    super(props);

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

    this.$historyList = new Histories({}).$dom;

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

    this.setDom();
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
